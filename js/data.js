var defaultactivetab = {
	"ibbleveltracker": 0,
	"ibbstatscalculator": 0,
}

var defaulttabs = [{
	"id": "tab0",
	"name": "Tab 0",
	"windfall": '1aa',

	"data": [
		{
			'slot': 'base',
			'type': 'basic',
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '175',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '7.5k',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '175k',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '15m',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '400b',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '10q',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '10s',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '100o',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '5aa',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '80ac',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
		{
			'slot': '110ae',
			'type': null,
			'amount': null,
			'speedlvl': null,
			'powerlvl': null,
			'ballspec': false,
			'friend': false,
			'enrage': false,
		},
	],
}];

var defaultprestige = [
	{
		"key": "Ball Speed",
		"value": 3.3,
		"step": 0.1,
		"base": 1.3,
		"min": 0,
		"max": 20,
		"level": 20,
	},
	{
		"key": "Ball Power",
		"value": 11.3,
		"step": 0.2,
		"base": 1.3,
		"min": 0,
		"max": 50,
		"level": 50,
	},
	{
		"key": "New Ball Cost",
		"value": -66,
		"step": -3,
		"base": -12,
		"min": 0,
		"max": 18,
		"level": 18,
	},
	{
		"key": "Ball Speed Cost",
		"value": -66,
		"step": -3,
		"base": -12,
		"min": 0,
		"max": 18,
		"level": 18,
	},
	{
		"key": "Ball Power Cost",
		"value": -66,
		"step": -3,
		"base": -12,
		"min": 0,
		"max": 18,
		"level": 18,
	},
];

var defaultcards = [
	{
		"key": "Ball Speed",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 1.25,
				2: 1.40,
				3: 1.55,
				4: 1.70,
				5: 1.85,
				6: 2.00,
				7: 2.00,
				8: 2.00,
				9: 2.00,
				10: 2.00,
				11: 2.00,
				12: 2.00,
			},
			"value2": {
				7: 1.25,
				8: 1.50,
				9: 1.75,
				10: 2.00,
				11: 2.25,
				12: 2.50,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.25,
				2: 1.50,
				3: 1.75,
				4: 2.00,
				5: 2.25,
				6: 2.50,
			},
		},
	},
	{
		"key": "Ball Power",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 1.50,
				2: 2.00,
				3: 2.50,
				4: 3.00,
				5: 3.50,
				6: 4.00,
				7: 4.50,
				8: 5.00,
				9: 5.50,
				10: 6.00,
				11: 6.50,
				12: 7.00,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.25,
				2: 1.50,
				3: 1.75,
				4: 2.00,
				5: 2.25,
				6: 2.50,
			},
		},
	},
	{
		"key": "Splash Radius",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				7: 1.25,
				8: 1.50,
				9: 1.75,
				10: 2.00,
				11: 2.25,
				12: 2.50,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.20,
				2: 1.40,
				3: 1.60,
				4: 1.80,
				5: 2.00,
				6: 2.20,
			},
		},
	},
	{
		"key": "Quality Control",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 0.50,
				2: 0.50,
				3: 0.50,
				4: 0.50,
				5: 0.50,
				6: 0.50,
				7: 0.50,
				8: 0.50,
				9: 0.50,
				10: 0.50,
				11: 0.50,
				12: 0.50,
			},
			"value2": {
				1: 3.00,
				2: 3.40,
				3: 3.80,
				4: 4.20,
				5: 4.60,
				6: 5.00,
				7: 5.40,
				8: 5.80,
				9: 6.20,
				10: 6.60,
				11: 7.00,
				12: 7.40,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.25,
				2: 1.50,
				3: 1.75,
				4: 2.00,
				5: 2.25,
				6: 2.50,
			},
		},
	},
	{
		"key": "Catalyst",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 3.00,
				2: 3.50,
				3: 4.00,
				4: 4.50,
				5: 5.00,
				6: 5.50,
				7: 6.00,
				8: 6.50,
				9: 7.00,
				10: 7.50,
				11: 8.00,
				12: 8.50,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.25,
				2: 1.50,
				3: 1.75,
				4: 2.00,
				5: 2.25,
				6: 2.50,
			},
		},
	},
	{
		"key": "Shield Pen.",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 10.00,
				2: 12.00,
				3: 14.00,
				4: 16.00,
				5: 18.00,
				6: 20.00,
				7: 22.00,
				8: 24.00,
				9: 26.00,
				10: 28.00,
				11: 30.00,
				12: 32.00,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.20,
				2: 1.40,
				3: 1.60,
				4: 1.80,
				5: 2.00,
				6: 2.20,
			},
		},
	},
	{
		"key": "Splash Damage",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 10.00,
				2: 20.00,
				3: 30.00,
				4: 40.00,
				5: 50.00,
				6: 60.00,
				7: 70.00,
				8: 80.00,
				9: 90.00,
				10: 100.00,
				11: 110.00,
				12: 120.00,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.25,
				2: 1.50,
				3: 1.75,
				4: 2.00,
				5: 2.25,
				6: 2.50,
			},
		},
	},
	{
		"key": "Noxious Fumes",
		"active": true,
		"mastery": {
			"level": 0,
			"value": {
				1: 1.25,
				2: 1.50,
				3: 1.75,
				4: 2.00,
				5: 2.25,
				6: 2.50,
			},
		},
	},
	{
		"key": "Ball Spec.",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 2.00,
				2: 2.40,
				3: 2.80,
				4: 3.20,
				5: 3.60,
				6: 4.00,
				7: 4.40,
				8: 4.80,
				9: 5.20,
				10: 5.60,
				11: 6.00,
				12: 6.40,
			},
		},
		"mastery": {
			"level": 0,
			"value": {
				1: 1.25,
				2: 1.50,
				3: 1.75,
				4: 2.00,
				5: 2.25,
				6: 2.50,
			},
		},
	},
	{
		"key": "Rage Battery",
		"active": true,
		"card": {
			"level": 6,
			"value1": {
				1: 1.30,
				2: 1.60,
				3: 1.90,
				4: 2.20,
				5: 2.50,
				6: 2.80,
				7: 3.10,
				8: 3.40,
				9: 3.70,
				10: 4.00,
				11: 4.30,
				12: 4.60,
			},
		},
	},
];

var defaultperks = [
	{
		"key": "Ball Speed",
		"value": 4.0,
		"step": 0.2,
		"base": 1,
		"min": 0,
		"max": 15,
		"level": 15,
	},
	{
		"key": "Ball Power",
		"value": 4.0,
		"step": 0.25,
		"base": 1,
		"min": 0,
		"max": 50,
		"level": 12,
	},
	{
		"key": "New Ball Cost",
		"value": -60,
		"step": -20,
		"base": 0,
		"min": 0,
		"max": 3,
		"level": 3,
	},
	{
		"key": "Ball Speed Cost",
		"value": -60,
		"step": -20,
		"base": 0,
		"min": 0,
		"max": 3,
		"level": 3,
	},
	{
		"key": "Ball Power Cost",
		"value": -60,
		"step": -20,
		"base": 0,
		"min": 0,
		"max": 3,
		"level": 3,
	},
];

var defaultboosts = [
	{
		"key": "Power Hungry",
		"active": false,
	},
];

var defaultbadges = [
	{
		"id": "basic",
		"key": "Basic",
		"value": 0,
		"step": 1,
	},
	{
		"id": "splash",
		"key": "Splash",
		"value": 0,
		"step": 1,
	},
	{
		"id": "sniper",
		"key": "Sniper",
		"value": 0,
		"step": 1,
	},
	{
		"id": "poison",
		"key": "Poison",
		"value": 0,
		"step": 1,
	},
	{
		"id": "demo",
		"key": "Demo",
		"value": 0,
		"step": 1,
	},
	{
		"id": "scatter",
		"key": "Scatter",
		"value": 0,
		"step": 1,
	},
	{
		"id": "cash",
		"key": "Cash",
		"value": 0,
		"step": 1,
	},
	{
		"id": "pierce",
		"key": "Pierce",
		"value": 0,
		"step": 1,
	},
	{
		"id": "sword",
		"key": "Sword",
		"value": 0,
		"step": 1,
	},
	{
		"id": "fire",
		"key": "Fire",
		"value": 0,
		"step": 1,
	},
	{
		"id": "lightning",
		"key": "Lightning",
		"value": 0,
		"step": 1,
	},
	{
		"id": "proportional",
		"key": "Proportional",
		"value": 0,
		"step": 1,
	},
];

var defaultskills = {
	"basic": [
		{
			"key": "Speed",
			"value": null,
			"step": 0.05,
			"base": 1.05,
			"min": 0,
			"max": 8,
			"level": 0,
		},
		{
			"key": "Power",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 6,
			"level": 0,
		},
		{
			"key": "Splash Size",
			"active": false,
		},
		{
			"key": "Friend Bonus",
			"value": null,
			"step": 0.5,
			"base": 1,
			"min": 0,
			"max": 6,
			"level": 0,
		},
		{
			"key": "Unlimited Friend Bonus",
		},
		{
			"key": "Network Friends Expansion",
		},
	],
	"splash": [
		{
			"key": "Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Splash Size",
		},
		{
			"key": "Time Bomb",
			"value": null,
			"step": 0.2,
			"base": 1.8,
			"min": 0,
			"max": 6,
			"level": 0,
		},
		{
			"key": "Programmed Time Bomb",
		},
		{
			"key": "Explosion Expansion",
		},
	],
	"sniper": [
		{
			"key": "Shield Damage",
			"value": null,
			"step": 0.5,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "More Cash",
		},
		{
			"key": "Archer Sniper",
			"value": null,
			"step": 20,
			"base": 0,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Archer Sniper Ninja",
		},
		{
			"key": "Sniper Shuriken",
		},
	],
	"poison": [
		{
			"key": "Speed",
			"value": null,
			"step": 0.05,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Poison Decay",
		},
		{
			"key": "Enrage",
			"value": null,
			"step": 0.5,
			"base": 1.5,
			"min": 0,
			"max": 3,
			"level": 0,
		},
		{
			"key": "Poison Spread",
		},
	],
	"demo": [
		{
			"key": "Enrage",
			"value": null,
			"step": 0.5,
			"base": 1.5,
			"min": 0,
			"max": 3,
			"level": 0,
		},
		{
			"key": "Enrage Stack",
			"active": false,
		},
		{
			"key": "Speed",
			"value": null,
			"step": 0.05,
			"base": 1.05,
			"min": 0,
			"max": 8,
			"level": 0,
		},
		{
			"key": "Enrage Fight",
			"value": null,
			"step": 0.3,
			"base": 1,
			"min": 0,
			"max": 10,
			"level": 0,
		},
		{
			"key": "Cumulative Strength",
			"value": null,
			"step": 0.3,
			"base": 1,
			"min": 0,
			"max": 10,
			"level": 0,
		},
	],
	"scatter": [
		{
			"key": "Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Split",
			"value": null,
			"step": 1,
			"base": 2,
			"min": 0,
			"max": 3,
			"level": 0,
		},
		{
			"key": "Fly Children!",
			"value": null,
			"step": 5,
			"base": 40,
			"min": 0,
			"max": 4,
			"level": 0,
		},
		{
			"key": "Scatter Merge",
			"active": false,
		},
	],
	"cash": [
		{
			"key": "Power",
			"value": null,
			"step": 0.1,
			"base": 1.1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "More Cash",
		},
		{
			"key": "Buried Treasure",
		},
		{
			"key": "More Buried Treasure",
		},
	],
	"pierce": [
		{
			"key": "Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Detonate Bomb Squad",
		},
		{
			"key": "Big Ball",
		},
		{
			"key": "Persistent Big Ball",
		},
		{
			"key": "Big Faster",
		},
	],
	"sword": [
		{
			"key": "Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Speed",
			"value": null,
			"step": 0.05,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Shields Remove",
		},
	],
	"fire": [
		{
			"key": "Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Fire Spread",
		},
		{
			"key": "Floor is Lava",
			"value": null,
			"step": 5,
			"base": 15,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Big Lava",
		},
		{
			"key": "Intense Lava",
			"value": null,
			"step": 0.2,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
	],
	"lightning": [
		{
			"key": "Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
		{
			"key": "Chain Size",
		},
		{
			"key": "Speed",
			"value": null,
			"step": 0.05,
			"base": 1,
			"min": 0,
			"max": 5,
			"level": 0,
		},
	],
	"proportional": [
		{
			"key": "Speed",
			"value": null,
			"step": 0.05,
			"base": 1.05,
			"min": 0,
			"max": 8,
			"level": 0,
		},
		{
			"key": "Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 6,
			"level": 0,
		},
		{
			"key": "Blue Bricks Damage",
			"value": null,
			"step": 0.1,
			"base": 1,
			"min": 0,
			"max": 10,
			"level": 0,
		},
		{
			"key": "Instant Destruction",
		},
	]
};

var defaultsettings = {
	"prestige": defaultprestige,
	"cards": defaultcards,
	"perks": defaultperks,
	"boosts": defaultboosts,
	"badges": defaultbadges,
	"skills": defaultskills,
};

var slots = [
	"base",
	"175",
	"7.5k",
	"175k",
	"15m",
	"400b",
	"10q",
	"10s",
	"100o",
	"5aa",
	"80ac",
	"110ae"
];

var available = {
	null: [
		"basic",
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
		"proportional",
	],
	"base": [
		"basic"
	],
	"175": [
		"splash",
		"sniper",
	],
	"7.5k": [
		"splash",
		"sniper",
		"poison",
		"demo",
	],
	"175k": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
	],
	"15m": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
	],
	"400b": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
	],
	"10q": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
		"proportional",
	],
	"10s": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
		"proportional",
	],
	"100o": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
		"proportional",
	],
	"5aa": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
		"proportional",
	],
	"80ac": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
		"proportional",
	],
	"110ae": [
		"splash",
		"sniper",
		"poison",
		"demo",
		"scatter",
		"cash",
		"pierce",
		"sword",
		"fire",
		"lightning",
		"proportional",
	],
};

var availableslots = {
	null: [
		"base",
		"175",
		"7.5k",
		"175k",
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"basic": [
		"base"
	],
	"splash": [
		"175",
		"7.5k",
		"175k",
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"sniper": [
		"175",
		"7.5k",
		"175k",
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"poison": [
		"7.5k",
		"175k",
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"demo": [
		"7.5k",
		"175k",
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"scatter": [
		"175k",
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"cash": [
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"pierce": [
		"15m",
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"sword": [
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"fire": [
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"lightning": [
		"400b",
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
	"proportional": [
		"10q",
		"10s",
		"100o",
		"5aa",
		"80ac",
		"110ae"
	],
}

var basestats = {
	"base": {
		"basic": {
			"speed": 1.0000,
			"power": 1.00
		}
	},
	"175": {
		"sniper": {
			"speed": 1.3750,
			"power": 4.20
		},
		"splash": {
			"speed": 0.8250,
			"power": 4.00
		}
	},
	"7.5k": {
		"sniper": {
			"speed": 1.5000,
			"power": 15.75
		},
		"splash": {
			"speed": 0.9000,
			"power": 15.00
		},
		"poison": {
			"speed": 1.0800,
			"power": 1.50
		},
		"demo": {
			"speed": 0.5400,
			"power": 300.00
		}
	},
	"175k": {
		"sniper": {
			"speed": 1.6250,
			"power": 63.00
		},
		"splash": {
			"speed": 0.9750,
			"power": 60.00
		},
		"poison": {
			"speed": 1.1700,
			"power": 1.65
		},
		"demo": {
			"speed": 0.5850,
			"power": 1200.00
		},
		"scatter": {
			"speed": 1.3000,
			"power": 60.00
		}
	},
	"15m": {
		"sniper": {
			"speed": 1.7500,
			"power": 210.00
		},
		"splash": {
			"speed": 1.0500,
			"power": 200.00
		},
		"poison": {
			"speed": 1.2600,
			"power": 1.85
		},
		"demo": {
			"speed": 0.6300,
			"power": 4000.00
		},
		"scatter": {
			"speed": 1.4000,
			"power": 200.00
		},
		"pierce": {
			"speed": 1.4000,
			"power": 200.00
		},
		"cash": {
			"speed": 1.5400,
			"power": 0.35
		}
	},
	"400b": {
		"sniper": {
			"speed": 1.9375,
			"power": 945.00
		},
		"splash": {
			"speed": 1.1625,
			"power": 900.00
		},
		"poison": {
			"speed": 1.3950,
			"power": 2.10
		},
		"demo": {
			"speed": 0.6975,
			"power": 18000.00
		},
		"scatter": {
			"speed": 1.5500,
			"power": 900.00
		},
		"pierce": {
			"speed": 1.5500,
			"power": 900.00
		},
		"cash": {
			"speed": 1.7050,
			"power": 0.39
		},
		"sword": {
			"speed": 1.9375,
			"power": 1170.00
		},
		"fire": {
			"speed": 1.9375,
			"power": 900.00
		},
		"lightning": {
			"speed": 1.3175,
			"power": 900.00
		}
	},
	"10q": {
		"sniper": {
			"speed": 2.1875,
			"power": 2730.00
		},
		"splash": {
			"speed": 1.3125,
			"power": 2600.00
		},
		"poison": {
			"speed": 1.5750,
			"power": 2.35
		},
		"demo": {
			"speed": 0.7875,
			"power": 52000.00
		},
		"scatter": {
			"speed": 1.7500,
			"power": 2600.00
		},
		"pierce": {
			"speed": 1.7500,
			"power": 2600.00
		},
		"cash": {
			"speed": 1.9250,
			"power": 0.43
		},
		"sword": {
			"speed": 2.1875,
			"power": 3380.00
		},
		"fire": {
			"speed": 2.1875,
			"power": 2600.00
		},
		"lightning": {
			"speed": 1.4875,
			"power": 2600.00
		},
		"proportional": {
			"speed": 1.4875,
			"power": 2600.00
		}
	},
	"10s": {
		"sniper": {
			"speed": 2.3750,
			"power": 12600.00
		},
		"splash": {
			"speed": 1.4250,
			"power": 12000.00
		},
		"poison": {
			"speed": 1.7100,
			"power": 2.70
		},
		"demo": {
			"speed": 0.8550,
			"power": 240000.00
		},
		"scatter": {
			"speed": 1.9000,
			"power": 12000.00
		},
		"pierce": {
			"speed": 1.9000,
			"power": 12000.00
		},
		"cash": {
			"speed": 2.0900,
			"power": 0.50
		},
		"sword": {
			"speed": 2.3750,
			"power": 15600.00
		},
		"fire": {
			"speed": 2.3750,
			"power": 12000.00
		},
		"lightning": {
			"speed": 1.6150,
			"power": 12000.00
		},
		"proportional": {
			"speed": 1.6150,
			"power": 12000.00
		}
	},
	"100o": {
		"sniper": {
			"speed": 2.5625,
			"power": 84000.00
		},
		"splash": {
			"speed": 1.5375,
			"power": 80000.00
		},
		"poison": {
			"speed": 1.8450,
			"power": 3.10
		},
		"demo": {
			"speed": 0.9225,
			"power": 1600000.00
		},
		"scatter": {
			"speed": 2.0500,
			"power": 80000.00
		},
		"pierce": {
			"speed": 2.0500,
			"power": 80000.00
		},
		"cash": {
			"speed": 2.2550,
			"power": 0.58
		},
		"sword": {
			"speed": 2.5625,
			"power": 104000.00
		},
		"fire": {
			"speed": 2.5625,
			"power": 80000.00
		},
		"lightning": {
			"speed": 1.7425,
			"power": 80000.00
		},
		"proportional": {
			"speed": 1.7425,
			"power": 80000.00
		}
	},
	"5aa": {
		"sniper": {
			"speed": 2.7500,
			"power": 756000.00
		},
		"splash": {
			"speed": 1.6500,
			"power": 720000.00
		},
		"poison": {
			"speed": 1.9800,
			"power": 3.25
		},
		"demo": {
			"speed": 0.9900,
			"power": 14400000.00
		},
		"scatter": {
			"speed": 2.200,
			"power": 720000.00
		},
		"pierce": {
			"speed": 2.200,
			"power": 720000.00
		},
		"cash": {
			"speed": 2.4200,
			"power": 0.65
		},
		"sword": {
			"speed": 2.7500,
			"power": 936000.00
		},
		"fire": {
			"speed": 2.7500,
			"power": 720000.00
		},
		"lightning": {
			"speed": 1.8700,
			"power": 720000.00
		},
		"proportional": {
			"speed": 1.8700,
			"power": 720000.00
		}
	},
	"80ac": {
		"sniper": {
			"speed": 2.9375,
			"power": 6050000.00
		},
		"splash": {
			"speed": 1.7625,
			"power": 5760000.00
		},
		"poison": {
			"speed": 2.1150,
			"power": 3.40
		},
		"demo": {
			"speed": 1.0575,
			"power": 115200000.00
		},
		"scatter": {
			"speed": 2.3500,
			"power": 5760000.00
		},
		"pierce": {
			"speed": 2.3500,
			"power": 5760000.00
		},
		"cash": {
			"speed": 2.5850,
			"power": 0.69
		},
		"sword": {
			"speed": 2.9375,
			"power": 7490000.00
		},
		"fire": {
			"speed": 2.9375,
			"power": 5760000.00
		},
		"lightning": {
			"speed": 1.9975,
			"power": 5760000.00
		},
		"proportional": {
			"speed": 1.9975,
			"power": 5760000.00
		}
	},
	"110ae": {
		"sniper": {
			"speed": 3.1275,
			"power": 16090000.00
		},
		"splash": {
			"speed": 1.8775,
			"power": 15320000.00
		},
		"poison": {
			"speed": 2.2525,
			"power": 4.00
		},
		"demo": {
			"speed": 1.1250,
			"power": 306430000.00
		},
		"scatter": {
			"speed": 2.5025,
			"power": 15320000.00
		},
		"pierce": {
			"speed": 2.5025,
			"power": 15320000.00
		},
		"cash": {
			"speed": 2.7525,
			"power": 0.73
		},
		"sword": {
			"speed": 3.1275,
			"power": 19920000.00
		},
		"fire": {
			"speed": 3.1275,
			"power": 15320000.00
		},
		"lightning": {
			"speed": 2.1275,
			"power": 15320000.00
		},
		"proportional": {
			"speed": 2.1275,
			"power": 15320000.00
		}
	}
};

var speedbasestats = {
	"basic": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"sniper": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"splash": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"poison": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"demo": {
		"increment": 0.33039,
		"modifier": 0.99446999
	},
	"scatter": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"pierce": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"cash": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"sword": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"fire": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"lightning": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
	"proportional": {
		"increment": 0.62787,
		"modifier": 0.9944711
	},
};

var powerbasestats = {
	"basic": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"sniper": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"splash": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"poison": {
		"increment": 0.434783,
		"modifier": 0.9925
	},
	"demo": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"scatter": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"pierce": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"cash": {
		"increment": 0.434783,
		"modifier": 0.9967
	},
	"sword": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"fire": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"lightning": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
	"proportional": {
		"increment": 1.00969,
		"modifier": 1.00997
	},
};

var basecosts = {
	"base": {
		"buy": 0,
		"ball": 6,
		"speed": 6,
		"power": 10
	},
	"175": {
		"buy": 175,
		"ball": 175,
		"speed": 200,
		"power": 200
	},
	"7.5k": {
		"buy": 7500,
		"ball": 7500,
		"speed": 7500,
		"power": 7500
	},
	"175k": {
		"buy": 175e3,
		"ball": 175e3,
		"speed": 175e3,
		"power": 175e3
	},
	"15m": {
		"buy": 15e6,
		"ball": 15e6,
		"speed": 15e6,
		"power": 15e6
	},
	"400b": {
		"buy": 400e9,
		"ball": 400e9,
		"speed": 400e9,
		"power": 400e9
	},
	"10q": {
		"buy": 10e15,
		"ball": 10e15,
		"speed": 10e15,
		"power": 10e15
	},
	"10s": {
		"buy": 10e21,
		"ball": 10e21,
		"speed": 10e21,
		"power": 10e21
	},
	"100o": {
		"buy": 100e27,
		"ball": 100e27,
		"speed": 100e27,
		"power": 100e27
	},
	"5aa": {
		"buy": 5e36,
		"ball": 5e36,
		"speed": 5e36,
		"power": 5e36
	},
	"80ac": {
		"buy": 80e42,
		"ball": 80e42,
		"speed": 80e42,
		"power": 80e42
	},
	"110ae": {
		"buy": 110e48,
		"ball": 110e48,
		"speed": 110e48,
		"power": 110e48
	}
}

var brickmult = [
	{
		"level": 1,
		"mult": 1,
		"cumulative": 1,
	},
	{
		"level": 75,
		"mult": 1.2,
		"cumulative": 1.2,
	},
	{
		"level": 100,
		"mult": 1.25,
		"cumulative": 1.5,
	},
	{
		"level": 150,
		"mult": 1.4,
		"cumulative": 2.1,
	},
	{
		"level": 200,
		"mult": 1.5,
		"cumulative": 3.15,
	},
	{
		"level": 250,
		"mult": 1.6,
		"cumulative": 5.04,
	},
	{
		"level": 300,
		"mult": 1.7,
		"cumulative": 8.568,
	},
	{
		"level": 400,
		"mult": 1.8,
		"cumulative": 15.4224,
	},
	{
		"level": 500,
		"mult": 2,
		"cumulative": 30.8448,
	},
	{
		"level": 750,
		"mult": 2.5,
		"cumulative": 77.112,
	},
	{
		"level": 1000,
		"mult": 2.5,
		"cumulative": 192.78,
	},
	{
		"level": 1500,
		"mult": 2.5,
		"cumulative": 481.95,
	},
	{
		"level": 2500,
		"mult": 3,
		"cumulative": 1445.85,
	},
	{
		"level": 5000,
		"mult": 3,
		"cumulative": 4337.55,
	},
	{
		"level": 7500,
		"mult": 3.5,
		"cumulative": 15181.425,
	},
	{
		"level": 10000,
		"mult": 3.5,
		"cumulative": 53134.9875,
	},
	{
		"level": 15000,
		"mult": 4,
		"cumulative": 212539.95,
	},
	{
		"level": 20000,
		"mult": 4,
		"cumulative": 850159.8,
	},
	{
		"level": 25000,
		"mult": 4,
		"cumulative": 3400639.2,
	},
	{
		"level": 30000,
		"mult": 4,
		"cumulative": 13602556.8,
	},
	{
		"level": 40000,
		"mult": 4,
		"cumulative": 54410227.2,
	},
	{
		"level": 50000,
		"mult": 4,
		"cumulative": 217640908.8,
	},
	{
		"level": 75000,
		"mult": 4,
		"cumulative": 870563635.2,
	},
	{
		"level": 100000,
		"mult": 5,
		"cumulative": 4352818176,
	},
	{
		"level": 125000,
		"mult": 6,
		"cumulative": 26116909056,
	},
	{
		"level": 150000,
		"mult": 7,
		"cumulative": 182818363392,
	},
	{
		"level": 175000,
		"mult": 8,
		"cumulative": 1462546907136,
	},
	{
		"level": 200000,
		"mult": 9,
		"cumulative": 13162922164224,
	},
]

var defaultbrickhealth = [
	{
		"level": 1000
	},
	{
		"level": 10000
	},
	{
		"level": 1000000
	}
]

var defaultbreakpoints = [
	{
		'source': 'Poison',
		'slot': '7.5k',
		'type': 'poison',
		'amount': 50,
		'speedlvl': 99,
		'powerlvl': 119,
		'ballspec': true,
		'friend': true,
		'enrage': true,
	},
	{
		'source': 'Damage',
		'slot': null,
		'type': null,
		'amount': null,
		'speedlvl': null,
		'powerlvl': null,
		'ballspec': false,
		'friend': false,
		'enrage': false,			
	}
]


const lookup = [
	{ value: 0, symbol: "" },
	{ value: 1e3, symbol: "K" },
	{ value: 1e6, symbol: "M" },
	{ value: 1e9, symbol: "B" },
	{ value: 1e12, symbol: "T" },
	{ value: 1e15, symbol: "q" },
	{ value: 1e18, symbol: "Q" },
	{ value: 1e21, symbol: "s" },
	{ value: 1e24, symbol: "S" },
	{ value: 1e27, symbol: "O" },
	{ value: 1e30, symbol: "N" },
	{ value: 1e33, symbol: "D" },
	{ value: 1e36, symbol: "aa" },
	{ value: 1e39, symbol: "ab" },
	{ value: 1e42, symbol: "ac" },
	{ value: 1e45, symbol: "ad" },
	{ value: 1e48, symbol: "ae" },
	{ value: 1e51, symbol: "af" },
	{ value: 1e54, symbol: "ag" },
	{ value: 1e57, symbol: "ah" },
	{ value: 1e60, symbol: "ai" },
	{ value: 1e63, symbol: "aj" },
	{ value: 1e66, symbol: "ak" },
	{ value: 1e69, symbol: "al" },
	{ value: 1e72, symbol: "am" },
	{ value: 1e75, symbol: "an" },
	{ value: 1e78, symbol: "ao" },
	{ value: 1e81, symbol: "ap" },
	{ value: 1e84, symbol: "aq" },
	{ value: 1e87, symbol: "ar" },
	{ value: 1e90, symbol: "as" },
	{ value: 1e93, symbol: "at" },
	{ value: 1e96, symbol: "au" },
	{ value: 1e99, symbol: "av" },
	{ value: 1e102, symbol: null },
];
function FormatNumber(num) {
	var item = lookup.slice().reverse().find(function (item) {
		return num >= item.value;
	});

	if (item === undefined) {
		return 0;
	}

	if (item.symbol === null) {
		return num.toExponential(2);
	}
	
	if (item.value == 0) {
		return (num / 1.00).toFixed(2);
	}

	return item ? (num / item.value).toFixed(2) + item.symbol : "0";
}
function UnFormatNumber(text) {
	if (!isNaN(text)) {
		return parseFloat(text);
	}
	
	var num = parseFloat(text);
	if (isNaN(num)) {
		return NaN;
	}
	
	var symbol = text.replace(num, '');
	var item = lookup.slice().reverse().find(function (item) {
		return symbol.localeCompare(item.symbol, undefined, { sensitivity: 'accent' }) === 0
	});

	if (item === undefined) {
		return NaN;
	}
	
	return num * item.value;
}

function UpgradeSettingScripts(settings, storekey) {
	// v2.1.17 Splash Damage Card
	// v2.1.42 Mastery Cards
	//if (!settings.cards.some(e => e.key == "Splash Damage")) {
	//	settings.cards.push(
	//	{
	//		"key": "Splash Damage",
	//		"value": 60,
	//		"active": true,
	//		"step": 10,
	//	});
	//}

	// v2.1.17 Rage Battery Card
	// v2.1.42 Mastery Cards
	//if (!settings.cards.some(e => e.key == "Rage Battery")) {
	//	settings.cards.push(
	//	{
	//		"key": "Rage Battery",
	//		"value": 2.8,
	//		"active": true,
	//		"step": 0.3,
	//	});
	//}

	if (!settings.prestige[0].level) {
		settings.prestige.forEach(p => {
			var def = defaultprestige.find(d => d.key === p.key);
			p["base"] = def.base;
			p["min"] = def.min;
			p["max"] = def.max;
			p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
		});
	}

	// v2.1.42 Mastery Cards
	//if (!settings.cards[0].level) {
	//	settings.cards.forEach(p => {
	//		var def = defaultcards.find(d => d.key === p.key);
	//		p["base"] = def.base;
	//		p["min"] = def.min;
	//		p["max"] = def.max;
	//		p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
	//	});
	//}

	if (!settings.perks[0].level) {
		settings.perks.forEach(p => {
			var def = defaultperks.find(d => d.key === p.key);
			p["base"] = def.base;
			p["min"] = def.min;
			p["max"] = def.max;
			p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
		});
	}

	if (!settings.skills.basic[0].level) {
		settings.skills.basic.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.basic.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.splash[0].level) {
		settings.skills.splash.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.splash.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.sniper[0].level) {
		settings.skills.sniper.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.sniper.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.poison[0].level) {
		settings.skills.poison.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.poison.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.demo[0].level) {
		settings.skills.demo.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.demo.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.scatter[0].level) {
		settings.skills.scatter.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.scatter.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.cash[0].level) {
		settings.skills.cash.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.cash.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.pierce[0].level) {
		settings.skills.pierce.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.pierce.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.sword[0].level) {
		settings.skills.sword.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.sword.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.fire[0].level) {
		settings.skills.fire.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.fire.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.skills.lightning[0].level) {
		settings.skills.lightning.forEach(p => {
			if (p.value !== undefined) {
				var def = defaultskills.lightning.find(d => d.key === p.key);
				p["base"] = def.base;
				p["min"] = def.min;
				p["max"] = def.max;
				p["level"] = ((p.value - def.base) / def.step) >= def.min && ((p.value - def.base) / def.step) <= def.max ? Math.round((p.value - def.base) / def.step) : def.min;
			}
		});
	}

	if (!settings.badges.some(b => b.id === "proportional")) {
		var proportionalbadges = defaultbadges.find(b => b.id === "proportional");
		settings.badges.push(proportionalbadges);
	}

	if (!settings.skills.proportional) {
		settings.skills["proportional"] = defaultskills.proportional;
	}
	
	// v2.1.42 Mastery Cards
	if (!settings.cards[0].mastery) {
		settings.cards = defaultcards;
	}

	StoreItem(storekey, settings);
}

function UpgradeTabScripts(tabs, storekey) {
	tabs.forEach(tab => {
		if (!tab.data.some(d => d.slot === "110ae")) {
			var aetab = defaulttabs[0].data.find(d => d.slot === "110ae");
			tab.data.push(aetab);
		}
	});

	StoreItem(storekey, tabs)
}