import { describe, expect, it } from "vitest";
import { CCM_LOGO_SRC } from "../client/src/lib/brandAssets";

describe("production brand assets", () => {
  it("embeds the CCM logo as a self-contained PNG data URI", () => {
    expect(CCM_LOGO_SRC).toMatch(/^data:image\/png;base64,/);
    expect(CCM_LOGO_SRC).not.toContain("/manus-storage/");
  });
});
