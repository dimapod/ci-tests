'use strict';

describe 'directives', ->
  beforeEach module 'myApp.services'

  describe 'version', ->
    it 'should return current version', ->
      inject (version) ->
        expect(version).toEqual '0.1'
