"use strict";

LD38.Song.level1 = () => new LD38.Song({
	bpm     : 115,
	delay   : 1500,
	duration: 40000,
	file    : "ld38-level1",
	next    : 'drumtest',
	spacing : 15,
	notes   : {
		0  : 0,
		4  : 0,
		8  : 0,
		12 : 0,

		16 : 1,
		20 : 1,
		24 : 1,
		28 : 1,
		32 : null,
		36 : null,
		40 : null,
		44 : null,

	},
});

