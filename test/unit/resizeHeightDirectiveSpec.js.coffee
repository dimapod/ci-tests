'use strict';

describe 'directives', ->
  beforeEach module 'b.directives.height'

  describe 'app-version', ->
    it 'should print current version', ->
      module ($provide) ->
        $provide.factory '$window', ->
          windowmock = jasmine.createSpy('$window');
          windowmock.innerHeight = 100;
          windowmock.addEventListener = () -> console.log "Hi"
          return windowmock;
        null

      inject ($compile, $rootScope, $window) ->
        element = $compile('<div resize-height></div>')($rootScope);
        $window.resize
        #expect(element.height()).toEqual 100;