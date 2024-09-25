import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { InlinePre } from "../../../utils/styles";

const tableCommon = css`
  border-left: 4px double white;
  border-right: 4px double white;
  width: 100%;
  border-spacing: 0;
  padding: 10px;

  th {
    text-align: left;
    font-weight: normal;
  }

  td {
    ::before {
      content: ": ";
    }
  }

  th:nth-child(1) {
    width: 180px;
  }

  td:nth-child(2) {
    width: 230px;
  }

  th:nth-child(3) {
    width: 190px;
  }
`;

const TopTable = styled.table`
  ${tableCommon}

  border-top: 3px double white;
  border-bottom: 1px solid white;
  padding-bottom: 10px;
`;

const BottomTable = styled.table`
  ${tableCommon}

  border-bottom: 3px double white;
  padding-top: 10px;

  th:nth-child(1) {
    width: 170px;
    padding-right: 10px;

    text-align: justify;
    text-align-last: justify;
  }
`;

function HardwareTable() {
  // prettier-ignore
  return (
    <>
        <TopTable>
          <tbody>
            <tr>
              <th scope="row">CPU Type</th>
              <td>PENTIUM-S</td>

              <th scope="row">Base Memory</th>
              <td><InlinePre>    640K</InlinePre></td>
            </tr>
            <tr>
              <th scope="row">Co-Processor</th>
              <td>Installed</td>

              <th scope="row">Extended Memory</th>
              <td><InlinePre>  31744K</InlinePre></td>
            </tr>
            <tr>
              <th scope="row">CPU Clock</th>
              <td>75MHz</td>

              <th scope="row">Cache Memory</th>
              <td><InlinePre>    None</InlinePre></td>
            </tr>
          </tbody>
        </TopTable>

        <BottomTable>
          <tbody>
            <tr>
              <th scope="row">Diskette Drive A</th>
              <td>2.88M, 3.5 in.</td>

              <th scope="row">Display Type</th>
              <td>EGA/VGA</td>
            </tr>
            <tr>
              <th scope="row">Diskette Drive B</th>
              <td>None</td>

              <th scope="row">Serial Port(s)</th>
              <td>3F8 2F8</td>
            </tr>
            <tr>
              <th scope="row">Pri. Master Disk</th>
              <td>LBA, Mode 2, 2621MB</td>

              <th scope="row">Paralell Port(s)</th>
              <td>378</td>
            </tr>
            <tr>
              <th scope="row">Pri. Slave Disk</th>
              <td>CDROM, Mode 4</td>

              <th scope="row">EDO DRAM at Row(s)</th>
              <td>None</td>
            </tr>
            <tr>
              <th scope="row">Sec. Master Disk</th>
              <td>None</td>

              <th scope="row">SDRAM at Row(s)</th>
              <td>0 1 2 3 4</td>
            </tr>
            <tr>
              <th scope="row">Sec. Slave Disk</th>
              <td>None</td>

              <th scope="row">L2 Cache Type</th>
              <td>None</td>
            </tr>
          </tbody>
        </BottomTable>
    </>
  );
}

export default HardwareTable;
