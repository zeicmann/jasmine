describe("toContain", function() {
  it("delegates to jasmineUnderTest.matchersUtil.contains", function() {
    var util = {
        contains: jasmine.createSpy('delegated-contains').and.returnValue(true)
      },
      matcher = jasmineUnderTest.matchers.toContain(util),
      result;

    result = matcher.compare("ABC", "B");
    expect(util.contains).toHaveBeenCalledWith("ABC", "B");
    expect(result.pass).toBe(true);
  });
});
