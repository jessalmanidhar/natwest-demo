import { test, expect, request } from "@playwright/test";
import { HomePage } from "../pages/home-page"
import { URLS } from "../constants/constants";
import { constants } from "../constants/constants";
import { ourPurposePointers } from "../constants/constants";
// @ts-ignore
import * as contrast from 'wcag-contrast';
import * as cheerio from 'cheerio';


let homePage: HomePage;

// This chunk will run before each to naviate to the Home page and close the privacy popup if it appears
test.beforeEach( async ({ page }) => {
    homePage = new HomePage(page);
    
    await page.goto(process.env.BASE_URL!)
    
    // If Privacy popup comes up, click on only necessary cookies button to close the popup
    if (await homePage.privacyPopup.isVisible({ timeout: 5000 })) {
        await homePage.onlyNecessaryCookieButton.click();
        await expect(homePage.onlyNecessaryCookieButton).not.toBeVisible()
    }
})

// This test will validate the title of the Home page
test("Validate the Title of the Home Page", async ({page}) => {
    await expect(page).toHaveTitle(constants.homePageTitle)
})

// This test will valdiate the heading of the the Home page
test("Validate the Heading of the Home Page", async ({page}) => {
    await expect(homePage.homePageHeadingOne).toHaveText(constants.homePageHeadingOne)
})

// This test will do a screenshot comparison of the banner image on the Home page
test("Validate the Banner Image on the Home Page", async ({page}, testInfo) => {
      await expect(homePage.homePageBannerImage).toHaveScreenshot(`${testInfo.title}.png`)
})

// This test will validate if Export Our Annual Report link opens up in a new tab
test("Validate the Export Our Annual Report Link opens in a new tab", async ({page}) => {
    
    // Listen for the new page event and click on the link to open in a new tab
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        homePage.exportOurAnnualReportLink.click()
    ])

    await newPage.waitForLoadState();

    // Validate the URL of the new page and then close the new tab
    const pages = page.context().pages();
    expect(pages.length).toBe(2);
    expect(newPage.url()).toBe(process.env.EXPORT_OUR_ANNUAL_REPORT_URL);
    await newPage.close();
})

// This test will validate the heading on Growing Together page using API testing
test("Validate Heading One on Growing Together Page using API Testing", async ({request}) => {
    
    // Store the response of the API call in a variable
    const response = await request.get(URLS.growinTogetherURL)
    expect (response.status()).toBe(200);
    
    // Convert the response body to text
    const responseBody = await response.text();
    
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(responseBody);
    
    // Extract the text of the h1 element and validate it
    const h1Text = $('h1').text().trim();
    expect(h1Text).toContain(constants.growingTogtherHeadingOne);
})

// This test will validate the size of the Suceeding with Customers image using API
test("Validate the size of the Suceeding with Customers image", async ({request}) => {
    
    // Make a get request to the image URL and store it in a variable
    const response = await request.get(URLS.succeedingWithCustomersImageURL)
    
    // Get the body of the response as a buffer
    const buffer = await response.body();
    
    // Get the image size in bytes
    const imageSizeInBytes = buffer.length;
    
    // Validate the image size with the expected image size
    expect(imageSizeInBytes).toEqual(constants.succeedingWithCustomersImageSize);
})

// This test will validate the functionality of the News Filter using APIs
test("Validate the functionality of News filter using API Testing", async ({request}) => {
    
    // Make a post request to filters API with the required payload
    const response = await request.post(URLS.filtersAPIURL, {
        data: {
            searchpath: "/content/natwestgroup_com/en_uk/natwestgroup/news-and-insights",
            filters: [
                {
                firstleveltags: `natwestgroup-content-hub/themes/${constants.aiAndDataThemeinFilter}`
                }
            ],
            isHubPageFilter: false,
            isDefaultArticles: false,
            startIndex: 0,
            brand: "NATWESTGROUP_COM",
            defaultcontenttypetags: "natwestgroup-content-hub/content-type/press-release,natwestgroup-content-hub/content-type/feature"
            }
    })

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseObject.totalArticles)
  .toBe(constants.aiAndDataFilteredItems);
})

// This test will validate if the image loads within 2 seconds
test("Validate that Commercial and Institutional image is loading in 2 seconds", async ({request}) => {
    const startTime = Date.now();
    const resposne = await request.get(process.env.COMMERCIAL_AND_INSTITUTIONAL_IMAGE_URL!)
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThanOrEqual(constants.expectedResponseTime);
})

// This will validate the array of Our Purpose section
test("Validate that Our Purpose section has correct pointers", async ({page}) => {
    await homePage.sustainibilityLink.click();
    const pointerSpan = homePage.ourPurposePointers;
    const ourPurposeActualText = await pointerSpan.allTextContents();

    for(let i = 0; i < ourPurposeActualText.length; i++) {
        expect(ourPurposeActualText[i]).toBe(ourPurposePointers[i]);
    }
})

// This will validate if the button text passes the WCAG 2.2 color contrast ratio
test("Validate if accessibility criteria passses for Growing Together button", async ({page}) => {
    
    // This will get the color of the text
    const textColor = await homePage.growingTogetherButton.evaluate(element => 
        getComputedStyle(element).color
    )

    // This will get the backgorund color of the text
    const backgroundColor = await homePage.growingTogetherButton.evaluate(element =>
        getComputedStyle(element).backgroundColor
    )

    console.log(`Text Color ${textColor}`);
    console.log(`Background Color ${backgroundColor}`);

    // This will remove the "rgb" using regex and then generate the color contras
    const ratio = contrast.rgb(
        textColor.match(/\d+/g)?.map(Number),
        backgroundColor.match(/\d+/g)?.map(Number)
    )

    console.log(`Contrast Ratio: ${ratio}`);
    expect(ratio).toBeGreaterThanOrEqual(constants.expectedContrastRatioForNormalText)
})
