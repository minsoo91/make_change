function makeChange(changeAmount, denominations) {
	var wallet = [];
	var cache = {};
	if (changeAmount == 0) {
		return [];
	}
	denominations.forEach(function (coinValue) {
		if (changeAmount >= coinValue) {
			var leftoverChange = changeAmount - coinValue;
			// if the subproblem solution does not exist, solve it
			if (!cache[leftoverChange]) {
				cache[leftoverChange] = makeChange(leftoverChange, denominations);
			}
			// an iteration of the overall solution
			var newWallet = [coinValue].concat(cache[leftoverChange]);
			// if newWallet is the first iteration of the overall solution 
			// or the new solution is better than the old solution, update the solution
			if (!wallet.length || wallet.length > newWallet.length) {
				wallet = newWallet;
			}
		}
	})
	return wallet;
}

print(makeChange(37, [1, 6, 10, 25]));