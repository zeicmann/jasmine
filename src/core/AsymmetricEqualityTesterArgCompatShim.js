getJasmineRequireObj().AsymmetricEqualityTesterArgCompatShim = function(j$) {
  var deprecationMsg =
    'The second argument to ' +
    '<asymmetric equality tester>.asymmetricMatch() is changing from an ' +
    "array of custom equality testers to a matchersUtil. Right now it's " +
    'an object that behaves like both, for migration purposes, but in a ' +
    'future release it will be only a matchersUtil. See ' +
    '<TODO reference to mgiration notes> for more information.';

  function AsymmetricEqualityTesterArgCompatShim(
    matchersUtil,
    customEqualityTesters
  ) {
    var self = Object.create(matchersUtil),
      i;

    wrapAndDeprecate(self, customEqualityTesters, 'length');

    for (i = 0; i < customEqualityTesters.length; i++) {
      wrapAndDeprecate(self, customEqualityTesters, i);
    }

    return self;
  }

  function wrapAndDeprecate(self, src, key) {
    Object.defineProperty(self, key, {
      get: function() {
        j$.getEnv().deprecated(deprecationMsg);
        return src[key];
      }
    });
  }

  return AsymmetricEqualityTesterArgCompatShim;
};
