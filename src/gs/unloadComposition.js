"use strict";

gs.unloadComposition = () => {
	return new Promise( ( res, rej ) => {
		if ( !gs.currCmp ) {
			res();
		} else {
			gs.controls.stop();
			if ( gs.currCmpSaved || !gs.undoredo._stack.length ) {
				gs._unloadCmp( true, res, rej );
			} else {
				gsuiPopup.confirm(
					"Warning",
					"Are you sure you want to discard the unsaved change ?"
				).then( b => {
					gs._unloadCmp( b, res, rej );
				} );
			}
		}
	} );
};

gs._unloadCmp = ( b, res, rej ) => {
	if ( b ) {
		const cmp = gs.currCmp,
			cmpOrig = gs.localStorage.get( cmp.id );

		gs.currCmpSaved = true;
		if ( cmpOrig ) {
			ui.cmps.saved( true );
			ui.cmps.update( cmp.id, cmpOrig );
		} else {
			ui.cmps.remove( cmp.id );
		}
	}
	if ( gs.currCmpSaved ) {
		wa.mainGrid.empty();
		wa.synths.empty();
		ui.synths.empty();
		gs.controls.currentTime( "main", 0 );
		gs.controls.currentTime( "pattern", 0 );
		gs.controls.patternLoop( false );
		ui.cmps.unload();
		ui.mainGrid.empty();
		ui.patterns.empty();
		ui.pattern.open( null );
		ui.synth.empty();
		gs.currCmp = null;
		res();
	} else {
		rej();
	}
};
