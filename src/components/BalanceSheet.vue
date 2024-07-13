<script setup lang="ts"></script>
<template>
  <h2>Balance Sheet</h2>
  <div class="doubleCol">
    <section>
      <table>
        <caption>
          <h3>Assets</h3>
        </caption>
        <tbody>
          <tr>
            <th scope="rowgroup" colspan="2">Current Assets</th>
          </tr>
          <tr>
            <th scope="row">Cash and cash equivalents</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Short-term investments</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Accounts receivable - net</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Other receivables</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Inventory</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Supplies</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Prepaid expenses</th>
            <td>2,200</td>
          </tr>
          <tr class="total">
            <th scope="rowgroup">Total current assets</th>
            <td>2,200</td>
          </tr>
          <tr class="total-one-line">
            <th scope="row">Investments</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="rowgroup" colspan="2">Property, plant & equipment</th>
          </tr>
          <tr>
            <th scope="row">Land</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Land improvements</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Buildings</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Equipment</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Less: accumulated depreciation</th>
            <td>2,200</td>
          </tr>
          <tr class="total">
            <th scope="rowgroup">Property, plant & equip. - net</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="rowgroup" colspan="2">Intangible assets</th>
          </tr>
          <tr>
            <th scope="row">Goodwill</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Other intangible assets</th>
            <td>2,200</td>
          </tr>
          <tr class="total">
            <th scope="rowgroup">Total intangible assets</th>
            <td>2,200</td>
          </tr>
          <tr class="total-one-line">
            <th scope="row">Other Assets</th>
            <td>2,200</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="total">
            <th scope="rowgroup">Total Assets</th>
            <td>2,200</td>
          </tr>
        </tfoot>
      </table>
    </section>
    <section>
      <table>
        <caption>
          <h3>Liabilities</h3>
        </caption>
        <tbody>
          <tr>
            <th scope="rowgroup" colspan="2">Current liabilities</th>
          </tr>
          <tr>
            <th scope="row">Current portion of long-term debt</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Short-term loans payable</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Accounts payable</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Accrued compensation and benefits</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Income taxes payable</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Other accrued liabilities</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Deferred revenues</th>
            <td>2,200</td>
          </tr>
          <tr class="total">
            <th scope="rowgroup">Total current liabilities</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="rowgroup" colspan="2">Long-term liabilities</th>
          </tr>
          <tr>
            <th scope="row">Notes payable</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Bonds payable</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Deferred income taxes</th>
            <td>2,200</td>
          </tr>
          <tr class="total">
            <th scope="rowgroup">Total long-term liabilities</th>
            <td>2,200</td>
          </tr>
          <tr class="total-one-line">
            <th scope="rowgroup">Total liabilities</th>
            <td>2,200</td>
          </tr>
        </tbody>
      </table>
      <caption>
        <span>Commitments and contingencies (see notes)</span>
      </caption>
      <table>
        <caption>
          <h3>Stockholders' Equity</h3>
        </caption>
        <tbody>
          <tr>
            <th scope="row">Common Stock</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Raised earnings</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Accum other comprehensive income</th>
            <td>2,200</td>
          </tr>
          <tr>
            <th scope="row">Less: Treasury stock</th>
            <td>2,200</td>
          </tr>
          <tr class="total">
            <th scope="rowgroup">Total stockholders' equity</th>
            <td>2,200</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="total">
            <th scope="rowgroup">Total liabilities & stockholders' equity</th>
            <td>2,200</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </div>
</template>

<style scoped>
.doubleCol {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3rem;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
}

tbody .total th {
  padding-left: 2rem;
}

td {
  text-align: right;
}

.total td {
  text-decoration-line: underline;
}

.total-one-line td {
  text-decoration-line: overline underline;
}

tfoot .total td {
  text-decoration-line: underline;
  text-decoration-style: double;
}
</style>
