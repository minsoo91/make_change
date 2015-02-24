def make_change(change_amount, denominations)
	cache = {}
	wallet = []
	return [] if change_amount == 0
	denominations.each do |coin_value|
		if change_amount >= coin_value
			leftover_change = change_amount - coin_value
			# if the subproblem solution does not exist, solve it and memoize
			if cache[leftover_change].nil?
				cache[leftover_change] = make_change(leftover_change, denominations)			
			end
			# an iteration of the overall solution
			new_wallet = [coin_value] + cache[leftover_change]
			# if newWallet is the first iteration of the overall solution 
			# or the new solution is better than the old solution, update the solution
			if wallet.length == 0 || wallet.length > new_wallet.length
				wallet = new_wallet
			end
		end
	end
	wallet
end

# make_change(37, [6, 1, 25, 10]) => [6, 6, 25]