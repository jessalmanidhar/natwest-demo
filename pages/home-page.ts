import { Page, Locator } from "@playwright/test";

export class HomePage {
    private readonly page: Page;
    readonly homePageHeadingOne: Locator;
    readonly homePageBannerImage: Locator;
    readonly onlyNecessaryCookieButton: Locator;
    readonly privacyPopup: Locator;
    readonly exportOurAnnualReportLink: Locator;
    readonly sustainibilityLink: Locator;
    readonly ourPurposePointers: Locator;
    readonly growingTogetherButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homePageHeadingOne = page.locator("//h1");
        this.homePageBannerImage = page.locator("//img[@alt = 'The image shows a NatWest Group colleague in a branch talking to a customer']")
        this.onlyNecessaryCookieButton = page.locator("//button[@id = 'onetrust-reject-all-handler']");
        this.privacyPopup = page.locator("//div[@id = 'onetrust-banner-sdk']");
        this.exportOurAnnualReportLink = page.locator("//a[@id = 'button-7d0139cc30']")
        this.sustainibilityLink = page.locator("//a[@href = '/sustainability.html']")
        this.ourPurposePointers = page.locator("//div[@id = 'text-97cd7dec01']/p/span")
        this.growingTogetherButton = page.locator("//a[@id = 'button-c2b017c3ff']/span[@class = 'cta-text']")
    }
}