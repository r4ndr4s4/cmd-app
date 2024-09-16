import { Pre } from "../../../utils/styles";

function DeviceTable() {
  // prettier-ignore
  return (
    <>
      <p>PCI device listing.....</p>

      <Pre>
        <p>Bus No.  Device No.  Func No.    Vendor ID   Device ID   Device Class        IRQ</p>
        <p>0        7           1           8086        1230        IDE Controller      14</p>
        <p>0        17          0           1274        1371        Multimedia Device   11</p>
      </Pre>
    </>
  );
}

export default DeviceTable;
