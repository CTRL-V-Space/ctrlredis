local GetResourceState = GetResourceState

local ctrlredis = exports.ctrlredis

local Redis = setmetatable(Redis or {}, {
	__index = function(_, index)
		return function(...)
			return ctrlredis[index](nil, ...)
		end
	end
})


local function onReady(cb)
	while GetResourceState('ctrlredis') ~= 'started' do
		Wait(50)
	end

	ctrlredis.awaitConnection()

	return cb and cb() or true
end


Redis.ready = setmetatable({
	await = onReady
}, {
	__call = function(_, cb)
		Citizen.CreateThreadNow(function() onReady(cb) end)
	end,
})

_ENV.Redis = Redis