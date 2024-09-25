import styled from "@emotion/styled";

import { Container } from "../SecondScreen";

const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  thead {
    text-align: left;

    th {
      font-weight: normal;
      padding-bottom: 10px;
      border-bottom: 1px solid white;
    }
  }

  tbody {
    text-align: center;

    tr:nth-child(1) > td {
      padding-top: 10px;
    }

    td:nth-child(6) {
      text-align: left;
    }
  }
`;

function DeviceTable() {
  return (
    <>
      <Container>
        <p>PCI device listing.....</p>

        <Table>
          <thead>
            <tr>
              <th>Bus No.</th>
              <th>Device No.</th>
              <th>Func No.</th>
              <th>Vendor ID</th>
              <th>Device ID</th>
              <th>Device Class</th>
              <th>IRQ</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>0</td>
              <td>7</td>
              <td>1</td>
              <td>8086</td>
              <td>1230</td>
              <td>IDE Controller</td>
              <td>14</td>
            </tr>

            <tr>
              <td>0</td>
              <td>17</td>
              <td>0</td>
              <td>1274</td>
              <td>1371</td>
              <td>Multimedia Device</td>
              <td>11</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default DeviceTable;
