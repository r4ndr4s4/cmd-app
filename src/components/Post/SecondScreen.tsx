import styled from "@emotion/styled";

import Footer from "./SecondScreen/Footer";
import DeviceTable from "./SecondScreen/DeviceTable";
import HardwareTable from "./SecondScreen/HardwareTable";
import Header from "./SecondScreen/Header";

export const Container = styled.div`
  width: 818px;
  margin: 0 auto;
`;

function SecondScreen() {
  return (
    <>
      <Header />
      <br />

      <HardwareTable />
      <br />

      <DeviceTable />
      <br />

      <Footer />
    </>
  );
}

export default SecondScreen;
