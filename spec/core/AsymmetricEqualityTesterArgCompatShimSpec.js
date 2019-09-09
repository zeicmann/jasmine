describe('AsymmetricEqualityTesterArgCompatShim', function() {
  it('provides all the properties of the MatchersUtil', function() {
    var matchersUtil = {
        foo: function() {},
        bar: function() {}
      },
      shim = new jasmineUnderTest.AsymmetricEqualityTesterArgCompatShim(
        matchersUtil,
        []
      );

    expect(shim.foo).toBe(matchersUtil.foo);
    expect(shim.bar).toBe(matchersUtil.bar);
  });

  it('provides all the properties of the customEqualityTesters', function() {
    var customEqualityTesters = [function() {}, function() {}],
      shim = new jasmineUnderTest.AsymmetricEqualityTesterArgCompatShim(
        {},
        customEqualityTesters
      );

    spyOn(jasmineUnderTest.getEnv(), 'deprecated'); // silence warnings

    expect(shim.length).toBe(2);
    expect(shim[0]).toBe(customEqualityTesters[0]);
    expect(shim[1]).toBe(customEqualityTesters[1]);
  });

  it('issues a deprecation warning when any customEqualityTester property is accessed', function() {
    var customEqualityTesters = [function() {}],
      shim = new jasmineUnderTest.AsymmetricEqualityTesterArgCompatShim(
        {},
        customEqualityTesters
      ),
      env = jasmineUnderTest.getEnv(),
      expectedMsg =
        'The second argument to ' +
        '<asymmetric equality tester>.asymmetricMatch() is changing from an ' +
        "array of custom equality testers to a matchersUtil. Right now it's " +
        'an object that behaves like both, for migration purposes, but in a ' +
        'future release it will be only a matchersUtil. See ' +
        '<TODO reference to mgiration notes> for more information.';

    spyOn(env, 'deprecated');

    shim[0];
    expect(env.deprecated).toHaveBeenCalledWith(expectedMsg);

    env.deprecated.calls.reset();
    shim.length;
    expect(env.deprecated).toHaveBeenCalledWith(expectedMsg);
  });
});
