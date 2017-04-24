"use strict";

LD38.Song.drumtest = () => new LD38.Song({
	hp      : 5,
	bpm     : 115,
	delay   : 1500,
	duration: 40000,
	file    : "drumtest",
	next    : 'level1',
	spacing : 10,
	notes   : {
		0  : 0,
		4  : 0,
		8  : 0,
		12 : 0,

		16 : 1,
		20 : 1,
		24 : 1,
		28 : 1,

		32 : 1,
		36 : 1,
		40 : 1,
		44 : 1,

		48 : 1,
		50 : 2,
		52 : 1,
		56 : 1,
		60 : 1,

		64 : 1,
		66 : 2,
		68 : 1,
		72 : 1,
		76 : 1,

		80 : 1,
		82 : 3,
		84 : 1,
		86 : 0,
		88 : 1,
	},
});

