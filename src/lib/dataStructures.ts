/**
 * Part 4: Advanced Data Structures
 * 
 * Implement Trie and LRU Cache from scratch
 */

/**
 * Trie Node for efficient prefix searching
 */
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

/**
 * Trie (Prefix Tree) for autocomplete functionality
 * 
 * Time Complexity:
 * - Insert: O(?) - TODO: Analyze
 * - Search: O(?) - TODO: Analyze
 * - StartsWith: O(?) - TODO: Analyze
 * 
 * Space Complexity: O(?) - TODO: Analyze
 */
export class Trie {
  private root: TrieNode;
  
  constructor() {
    this.root = new TrieNode();
  }
  
  /**
   * Insert a word into the trie
   * @param word - Word to insert
   * 
   * TODO: Implement this method
   */
  insert(word: string): void {
    // TODO: Implement
    // Algorithm:
    // 1. Start at root
    // 2. For each character in word:
    //    - If child node doesn't exist, create it
    //    - Move to child node
    // 3. Mark last node as end of word
  }
  
  /**
   * Search for a complete word in the trie
   * @param word - Word to search for
   * @returns True if word exists
   * 
   * TODO: Implement this method
   */
  search(word: string): boolean {
    // TODO: Implement
    return false;
  }
  
  /**
   * Find all words that start with given prefix
   * @param prefix - Prefix to search for
   * @returns Array of words with this prefix
   * 
   * TODO: Implement this method
   * Hint: This requires DFS/BFS to collect all words under prefix node
   */
  startsWith(prefix: string): string[] {
    // TODO: Implement
    // Algorithm:
    // 1. Navigate to the prefix node
    // 2. DFS from that node to find all complete words
    // 3. Collect and return words
    
    return [];
  }
  
  /**
   * Helper method to collect all words from a node
   * @param node - Starting node
   * @param prefix - Current prefix
   * @returns Array of complete words
   * 
   * TODO: Implement this helper
   */
  private collectWords(node: TrieNode, prefix: string): string[] {
    // TODO: Implement DFS
    return [];
  }
}

/**
 * LRU (Least Recently Used) Cache
 * 
 * Requirements:
 * - O(1) get operation
 * - O(1) put operation
 * - Maintain access order
 * - Evict least recently used when capacity reached
 * 
 * Implementation hint: Use Map + Doubly Linked List
 * Or: Use Map (JavaScript Map maintains insertion order)
 */
export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;
  
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  /**
   * Get value from cache
   * @param key - Cache key
   * @returns Value if exists, undefined otherwise
   * 
   * TODO: Implement O(1) get operation
   * Remember: Getting a value makes it "recently used"
   */
  get(key: K): V | undefined {
    // TODO: Implement
    // Algorithm:
    // 1. Check if key exists
    // 2. If yes, update access order (move to end)
    // 3. Return value
    
    return undefined;
  }
  
  /**
   * Put value into cache
   * @param key - Cache key
   * @param value - Value to cache
   * 
   * TODO: Implement O(1) put operation
   * Remember: If cache is full, evict least recently used
   */
  put(key: K, value: V): void {
    // TODO: Implement
    // Algorithm:
    // 1. If key exists, update value and access order
    // 2. If key is new:
    //    a. If cache is full, evict least recently used (first item)
    //    b. Add new key-value pair
  }
  
  /**
   * Get current size of cache
   */
  size(): number {
    return this.cache.size;
  }
  
  /**
   * Clear all cached items
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      capacity: this.capacity,
      utilization: (this.cache.size / this.capacity) * 100,
    };
  }
}

/**
 * Test cases for data structures
 */
export function testDataStructures() {
  console.log("=== Testing Trie ===");
  const trie = new Trie();
  
  // Test insert and search
  trie.insert("apple");
  trie.insert("app");
  trie.insert("application");
  
  console.log("Search 'apple':", trie.search("apple")); // true
  console.log("Search 'app':", trie.search("app")); // true
  console.log("Search 'appl':", trie.search("appl")); // false
  
  console.log("StartsWith 'app':", trie.startsWith("app"));
  // Expected: ["app", "apple", "application"]
  
  console.log("\n=== Testing LRU Cache ===");
  const cache = new LRUCache<string, number>(3);
  
  cache.put("a", 1);
  cache.put("b", 2);
  cache.put("c", 3);
  console.log("Cache after adding a,b,c:", cache.getStats());
  
  console.log("Get 'a':", cache.get("a")); // 1 (a is now most recent)
  
  cache.put("d", 4); // Should evict 'b' (least recent)
  console.log("Get 'b' after adding 'd':", cache.get("b")); // undefined
  console.log("Get 'a':", cache.get("a")); // 1 (still there)
  
  console.log("Final cache stats:", cache.getStats());
}

