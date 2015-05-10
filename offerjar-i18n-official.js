var msgPartTr = function(msg,record) {
  return msg + OfferJar.UI.tr(record.key,null,record.params,this);
}

// Make the modification needed for correct translation
_.extend(OfferJar.UI,{
  tr: function(key,action,params,lang) {
    if (action && !_.isString(action)) {
      lang = params;
      params = action;
      action = null;
    }
    
    if (!_.isArray(key)) {
      key = [key];
    }
    
    if (action) {
      key.unshift(action+"_"+key[0]);
    }
    if (!params) {
      params = {};
    }
    if (_.has(params,"default")) {
      if ( _.isArray(params["default"]) ) {
        key = key.concat(params["default"]);
      } else {
        key.push(params["default"]);
      }
      delete params["default"];
    }
    delete params.scope;
    /// Work around to a an issue in the i18n package. Try to go over all keys
    ///return __(key,params,lang);
    key = _.map(key,function(k) {
      return this + ':' + k;
    },TAPi18n._getPackageDomain('ronenm:offerjar-i18n-official'));
    return TAPi18next.t(key,params);
  },
  messageHTML: function(message,lang) {
    if (!_.has(message,"info")) {
      throw Meteor.Error('wrong_message',"Message does not have the 'info' property");
    }
    if (!_.isArray(message.info)) {
      message.info = [message.info];
    }
    return _.reduce(message.info,msgPartTr,"",lang);
  }
});

if (Meteor.isClient) {
  Template.registerHelper('ojt', function(key,action,params) {
    if (action instanceof Spacebars.kw) {
      params = action.hash;
      action = null;
    } else if (params instanceof Spacebars.kw) {
      params = params.hash;
    }
    return OfferJar.UI.tr(key,action,params);
  });
}