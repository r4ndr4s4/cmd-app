import { Pre } from "../../../utils/styles";

function HardwareTable() {
  // prettier-ignore
  return (
    <>
      <Pre>
        <p>CPU Type: PENTIUM-S                      Base Memory: 640K</p>
        <p>Co-Processor: Installed                  Extended Memory: 31744K</p>
        <p>CPU Clock: 75MHz                         Cache Memory: None</p>
      </Pre><br/>

      <Pre>
        <p>Diskette Drive A: 2.88M, 3.5 in.         Display Type: EGA/VGA</p>
        <p>Diskette Drive B: None                   Serial Port(s): 3F8 2F8</p>
        <p>Pri. Master Disk: LBA, Mode 2, 2621MB    Paralell Port(s): 378</p>
        <p>Pri. Slave Disk: CDROM, Mode 4           EDO DRAM at Row(s): None</p>
        <p>Sec. Master Disk: None                   SDRAM at Row(s): 0 1 2 3 4</p>
        <p>Sec. Slave Disk: None                    L2 Cache Type: None</p>
      </Pre>
    </>
  );
}

export default HardwareTable;
