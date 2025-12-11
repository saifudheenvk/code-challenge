function calculateSumRecursive(n: number): number {
    if(n === 0) {
        return 0;
    }
    return n + calculateSumRecursive(n - 1);
}

calculateSumRecursive(10);