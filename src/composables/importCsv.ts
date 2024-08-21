import type { Reference } from '@/models/types';

export default async (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  let csvData: string;
  const reader = new FileReader();

  if (inputEl.files) {
    reader.readAsText(inputEl.files[0]);
    reader.onload = () => {
      csvData = reader.result as string;
      parseCsv();
    };

    const parseCsv = async () => {
      if (csvData) {
        buildReferenceObj(csvData);
      } else {
        console.log('Error with getData()');
      }

      return;

      function buildReferenceObj(data: string) {
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
          const srcId = 1;
          const id = `${date}${dateOffset}${memo}${srcId}`;
          const isDebit = 1;

          const referenceObj: Reference = {
            date,
            dateOffset,
            amount,
            memo,
            srcId,
            id,
            isDebit,
          };

          console.log(referenceObj);

          // references.push(referenceObj);
        }
        inputEl.value = ''; //reset html file input element
      }

      function splitCsv(str: string) {
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
      }
    };
  } else {
    throw new Error('no files selected');
  }
};
