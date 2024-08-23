import type { Reference } from '@/models/types';

const postReference = async (references: Reference[]) => {
  const request = new Request('http://localhost:5000/api/references', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ references: references.slice(0, 500) }),
  });

  const response = await fetch(request);

  console.log(await response.json());
};

export default async (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  let csvData: string;
  const reader = new FileReader();

  const splitCsv = (str: string) => {
    const obj: { soFar: string[]; isConcatting: boolean } = {
      soFar: [],
      isConcatting: false,
    };
    return str.split(',').reduce((accum, curr) => {
      if (accum.isConcatting) {
        accum.soFar[accum.soFar.length - 1] += `,${curr}`;
      } else {
        accum.soFar.push(curr);
      }
      if (curr.split('"').length % 2 === 0) {
        accum.isConcatting = !accum.isConcatting;
      }
      return accum;
    }, obj).soFar;
  };

  const buildReference = (data: string) => {
    const references: Reference[] = [];
    const csvValues = splitCsv(data.replace(/[\n]/g, ','));
    const totalCol = 7;

    let lastDate: string | null = null;
    let dateOffset = 0;

    for (let i = 1; i < Math.floor(csvValues.length / totalCol); i++) {
      const date = new Date(csvValues[i * totalCol]).toISOString();

      if (lastDate === date) {
        dateOffset++;
      } else {
        dateOffset = 0;
        lastDate = date;
      }

      const amount = Math.round(
        Number.parseInt(
          (Number.parseFloat(csvValues[i * totalCol + 5]) * 100).toFixed(2),
        ),
      );

      const memo = csvValues[i * totalCol + 1];
      // const memo = fakeMemos[Math.floor(Math.random() * (fakeMemos.length - 1))];

      const reference = {
        id: null,
        date,
        dateOffset,
        amount,
        memo,
        srcId: null,
      };

      references.push(reference);
    }
    return references;
  };

  const parseCsv = (csvData: string) => {
    if (csvData) {
      return buildReference(csvData);
    }
    console.log('Error with getData()');
    return [];
  };

  if (inputEl.files) {
    reader.readAsText(inputEl.files[0]);
    reader.onload = () => {
      csvData = reader.result as string;
      const references = parseCsv(csvData);
      postReference(references);
    };
  } else {
    throw new Error('no files selected');
  }
};
