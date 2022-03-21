import { getMockConferencesDate } from "./mockConferenceApi";

describe("getMockConferencesDate", () => {
  it("should contain future and past conferences", () => {
    const confs = getMockConferencesDate();
    expect(confs).toHaveLength(2);
  });

  it("should contain 5 past and 5 future conferences if no parameter is set", () => {
    const confs = getMockConferencesDate();
    expect(confs[0]).toHaveLength(5);
    expect(confs[1]).toHaveLength(5);
  });

  it("should contain M pas and N future conferences if no parameter is set", () => {
    const confs = getMockConferencesDate(3, 2);
    expect(confs[0]).toHaveLength(3);
    expect(confs[1]).toHaveLength(2);
  });
});
