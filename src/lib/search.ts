/**
 * Part 1: Smart Search with Fuzzy Matching
 * 
 * TODO: Implement a fuzzy search algorithm that:
 * 1. Matches partial strings with typo tolerance
 * 2. Scores results by relevance
 * 3. Returns sorted results
 * 
 * Time Complexity: O(?) - Analyze and document
 * Space Complexity: O(?) - Analyze and document
 */

export interface SearchResult<T> {
  item: T;
  score: number;
  matchedField: string;
  matchType: 'exact' | 'starts-with' | 'contains' | 'fuzzy';
}

/**
 * Calculate Levenshtein distance between two strings
 * This measures the minimum number of single-character edits needed
 * 
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Number of edits needed
 * 
 * TODO: Implement this function
 * Hint: Use dynamic programming
 */
export function levenshteinDistance(str1: string, str2: string): number {
  // TODO: Implement
  return 0;
}

/**
 * Score a match between search term and target string
 * 
 * Scoring rules:
 * - Exact match: 100 points
 * - Starts with: 75 points
 * - Contains: 50 points
 * - Fuzzy match (1 char difference): 25 points
 * - No match: 0 points
 * 
 * @param searchTerm - What user searched for
 * @param target - String to match against
 * @returns Score and match type
 * 
 * TODO: Implement this function
 */
export function scoreMatch(
  searchTerm: string,
  target: string
): { score: number; matchType: SearchResult<any>['matchType'] } {
  // TODO: Implement
  // Hint: Normalize strings (lowercase, trim)
  // Hint: Check exact match first, then starts-with, then contains, then fuzzy
  
  return { score: 0, matchType: 'contains' };
}

/**
 * Perform fuzzy search across multiple fields of objects
 * 
 * @param items - Array of items to search
 * @param searchTerm - Search query
 * @param fields - Which fields to search in
 * @returns Sorted array of search results with scores
 * 
 * TODO: Implement this function
 * 
 * Example usage:
 * ```typescript
 * const projects = [
 *   { id: 1, name: "Mobile App", description: "iOS app" },
 *   { id: 2, name: "API Service", description: "Backend API" }
 * ];
 * 
 * const results = fuzzySearch(projects, "moble", ["name", "description"]);
 * // Should return Mobile App with fuzzy match score
 * ```
 */
export function fuzzySearch<T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): SearchResult<T>[] {
  // TODO: Implement
  // Algorithm:
  // 1. For each item, check all specified fields
  // 2. Calculate score for each field
  // 3. Keep the highest score for the item
  // 4. Filter items with score > 0
  // 5. Sort by score (descending)
  
  return [];
}

/**
 * Test cases to verify your implementation
 * Run these to check if your algorithm works correctly
 */
export function testFuzzySearch() {
  const testData = [
    { id: 1, name: "Mobile App Redesign", description: "iOS and Android" },
    { id: 2, name: "API Migration", description: "Move to new API" },
    { id: 3, name: "Analytics Dashboard", description: "Data visualization" },
  ];

  console.log("Test 1: Exact match");
  console.log(fuzzySearch(testData, "api", ["name", "description"]));
  // Expected: API Migration (exact) > Analytics Dashboard (contains)

  console.log("\nTest 2: Fuzzy match (typo)");
  console.log(fuzzySearch(testData, "moble", ["name", "description"]));
  // Expected: Mobile App Redesign with fuzzy score

  console.log("\nTest 3: Starts with");
  console.log(fuzzySearch(testData, "ana", ["name", "description"]));
  // Expected: Analytics Dashboard with high score

  console.log("\nTest 4: No match");
  console.log(fuzzySearch(testData, "xyz", ["name", "description"]));
  // Expected: Empty array
}

