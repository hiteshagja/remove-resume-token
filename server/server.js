var skyward_tokens = [];//THIS ARRAY WILL STORE JSON OBJECT CONTAINING {USER, CONNECTION AND TOKEN}

//HOOK TO GET CURRENT USER/CONNECTION TOKEN
Accounts.onLogin(function (user) {
  skyward_tokens.push({
    userId: user.user._id,
    connectionId: user.connection.id,
    token: Accounts._getLoginToken(user.connection.id)
  })
})

//HOOK TO REMOVE RESUME TOKEN FROM USER DOCUMENT
Accounts.onLogout(function (user) {
  if (!user.user) return; //IF USER OBJECT NOT FOUND

  //FIND TOKEN FOR CURRENT USER AND CONNECTION
  var tokenObj = _.find(skyward_tokens, function (d) {
    return d.userId == user.user._id && d.connectionId == user.connection.id;
  })

  if (tokenObj){
    //$PULL RESUME TOKEN
    Meteor.users.update(user._id, {$pull: {'services.resume.loginTokens': {hashedToken: tokenObj.token}}},function (err, res) {
      if (err) {
        console.log(err.message);
      }
      else {
        //ON SUCCESS
        //REMOVE TOKEN RELATED ENTRIES FROM TEMP ARRAY
        skyward_tokens = _.filter(skyward_tokens, function (d) {
          return d.token != tokenObj.token;
        });
      }
    })
  }
})
