# Problem 4: Sum Calculation Solutions

This directory contains three different implementations to calculate the sum of numbers from 1 to n.

## Solutions

### Solution 1: Loop-based (`solution1.ts`)
Uses a simple for loop to iterate through all numbers from 1 to n and accumulate the sum.

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

### Solution 2: Formula-based (`solution2.ts`)
Uses the mathematical formula: `n * (n + 1) / 2` to calculate the sum directly.

**Time Complexity:** O(1)  
**Space Complexity:** O(1)

### Solution 3: Recursive (`solution3.ts`)
Uses recursion to calculate the sum by breaking down the problem into smaller subproblems.

**Time Complexity:** O(n)  
**Space Complexity:** O(n) (due to the call stack)

## Comparison

- **Most Efficient:** Solution 2 (formula-based) - constant time and space
- **Most Readable:** Solution 1 (loop-based) - straightforward and easy to understand
- **Educational:** Solution 3 (recursive) - demonstrates recursive thinking, but less efficient for large inputs

