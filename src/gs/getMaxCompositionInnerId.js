"use strict";

gs.getMaxCompositionInnerId = cmp => (
	common.deepKeys( cmp ).reduce( ( n, key ) => {
		const id = common.smallIdParse( key );

		return id < 0 ? n : Math.max( n, id );
	}, 0 )
);
