// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by remove-refresh-token.js.
import { name as packageName } from "meteor/skywardsoftwares:remove-refresh-token";

// Write your tests here!
// Here is an example.
Tinytest.add('remove-refresh-token - example', function (test) {
  test.equal(packageName, "remove-refresh-token");
});
