'use strict';

describe('myApp.detail module', function() {

    beforeEach(module('myApp.detail'));

    describe('detail controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var detailCtrl = $controller('detail' +
                'Ctrl');
            expect(detailCtrl).toBeDefined();
        }));

    });
});