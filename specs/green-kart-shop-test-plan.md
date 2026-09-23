# GreenKart Shop Test Plan

## Application Overview

Test plan for the GreenKart shop homepage at https://www.green-kart.in/shop, covering catalog browsing, filters, sorting, shopping cart flow, and common validation scenarios.

## Test Scenarios

### 1. GreenKart Shop Catalog & Cart

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify shop page loads and product catalog is visible

**File:** `tests/green-kart/verify-shop-page-loads.spec.ts`

**Steps:**
  1. Open the page https://www.green-kart.in/shop in a fresh browser session.
    - expect: The page title should contain 'Products | GreenKart'.
    - expect: The 'All products' heading should be visible.
    - expect: At least several product cards should be displayed on the page.
    - expect: The product list should include names like 'Matar / Green Peas' and 'Kiwi'.
  2. Check the header and navigation elements near the top of the page.
    - expect: The shop navigation and category list should be present.
    - expect: The page should not show obvious layout breakage or blank sections.
    - expect: The visible product grid should be readable and accessible.

#### 1.2. Filter products by category and validate product list changes

**File:** `tests/green-kart/filter-by-category.spec.ts`

**Steps:**
  1. From the shop page, review category navigation such as 'Categories', 'All Products', 'Bundles', 'Exotic', 'Fruits', 'Leaf', and 'Vegetables'.
    - expect: Category links or tabs should be clickable.
    - expect: The default category selection should be 'All Products' or equivalent default state.
  2. Click a category such as 'Fruits' or 'Vegetables'.
    - expect: The product grid should update to show only matching items.
    - expect: The visible product cards should correspond to the selected category.
    - expect: If the category contains no products, the page should show a clear empty-state message instead of a broken layout.
  3. Select a different category from the same menu.
    - expect: The content should refresh correctly for the new category selection.
    - expect: Previous products should no longer remain visible unless expected by design.

#### 1.3. Apply the price range filter and verify results

**File:** `tests/green-kart/filter-by-price.spec.ts`

**Steps:**
  1. Use the price range slider or filter controls to adjust the minimum and maximum price values.
    - expect: The visible price range labels should update to reflect the chosen values.
    - expect: Only products within the selected range should remain visible.
    - expect: The product prices should remain consistent with the filter criteria.
  2. Set a range with no matching items, for example very low or very high values.
    - expect: The page should either show no results or a meaningful empty-state message.
    - expect: No product cards should appear with prices outside the selected range.
    - expect: The filter controls should remain usable for adjustment.
  3. Reset the filter by clearing filters or moving the slider back to default.
    - expect: The full product catalog should return.
    - expect: No stale filter state should persist after reset.

#### 1.4. Sort products by a different order and confirm ordering changes

**File:** `tests/green-kart/sort-products.spec.ts`

**Steps:**
  1. Open the sort dropdown and inspect the available options: 'Newest Arrivals', 'Featured', 'Name (A-Z)', 'Price - Low to High', and 'Price - High to Low'.
    - expect: The dropdown should list the expected sorting options.
    - expect: The currently selected option should be visible.
  2. Select 'Price - Low to High'.
    - expect: Products should reorder by ascending price.
    - expect: The first visible product should be the lowest-priced item matching the current filter state.
  3. Select 'Price - High to Low'.
    - expect: Products should reorder by descending price.
    - expect: The first visible item should be the highest-priced item in the current list.
  4. Select 'Name (A-Z)'.
    - expect: Products should be alphabetized by name.
    - expect: The order should be logically consistent and reproducible.

#### 1.5. Add a product to the cart from the catalog and validate cart state

**File:** `tests/green-kart/add-to-cart.spec.ts`

**Steps:**
  1. Choose a visible product card, for example 'Matar / Green Peas'.
    - expect: The product card should show a price and an 'Add to Cart' action.
    - expect: The product details should be readable and consistent with the catalog view.
  2. Click the 'Add to Cart' button for the selected product.
    - expect: The item should be added to the cart successfully.
    - expect: The cart counter or cart summary should update.
    - expect: The product should remain visible in the cart area if the store exposes one.
  3. Repeat the same action for a second product.
    - expect: The cart count should increase as expected.
    - expect: Multiple items should be reflected correctly in the cart summary or interface.
  4. Check that the cart contents reflect the correct products and prices.
    - expect: The added items should be listed with the expected names and price values.
    - expect: Totals should be accurate for the selected products.

#### 1.6. Validate wishlist and compare actions for product cards

**File:** `tests/green-kart/wishlist-compare.spec.ts`

**Steps:**
  1. Locate the 'Add to wishlist' and 'Compare' controls on a product card.
    - expect: Each control should be visible and clickable.
    - expect: Clicking them should not break the page layout.
  2. Click 'Add to wishlist' for one product.
    - expect: The product should be added to the wishlist state without causing a JavaScript error.
    - expect: A user-visible confirmation or state change should appear if the UI supports it.
  3. Click 'Compare' for one product.
    - expect: The compare workflow should initialize correctly.
    - expect: The selected product should be tracked as part of the comparison state if available.
  4. Refresh the page and verify whether wishlist/compare state persists or resets according to the app's expected behavior.
    - expect: The app should either maintain the state or reset it gracefully.
    - expect: There should be no broken UI or missing product content after reload.

#### 1.7. Perform negative and edge-case checks on the catalog and filters

**File:** `tests/green-kart/negative-edge-cases.spec.ts`

**Steps:**
  1. Try a price range that excludes all products, such as the minimum above the maximum or selecting a very narrow unrealistic range.
    - expect: The app should not crash or display malformed content.
    - expect: An empty-state message or no results indicator should appear gracefully if supported.
  2. Attempt to sort while filters are active and then clear filters.
    - expect: The page should update consistently without duplicate products or stale states.
    - expect: Sorting and filtering should continue to work after reset.
  3. Refresh the page repeatedly with different filter combinations.
    - expect: The page should remain stable and load correctly each time.
    - expect: No JavaScript errors should appear in the console or UI.
  4. Use a browser zoom or narrow viewport to simulate mobile browsing.
    - expect: The product grid should reflow appropriately without overlap or hidden controls.
    - expect: Buttons and sort dropdowns should remain usable.
