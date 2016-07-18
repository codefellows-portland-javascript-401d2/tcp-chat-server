var random = function() {
  var officeIpsum = ['MakeItPop', 'FindUsOnFacebook', 'MakeItLookLikeApple', 'ARealQuickJob', 'ILikeItButCanWeChangeIt', 'YourInvoiceSeemsReallyHigh', 'CanYouMakeItMorePink', 'CanYouMakeItBigger', 'WeDoNotNeedABackup', 'IDoNotKnowExactlyButNotThat', 'WeAreAStartup', 'MakeItMoreSleeker', 'MakeItOriginalLikeThis', 'CanWePutMyCatOverTheLogo', 'ThisOneIsFreeRight', 'WeHaveFiveMoreJobsForFree', 'HowMuchWillItCost', 'MakeItSexy', 'CanTheSnowLookWarmer', 'ThisCouldGoViral', 'ItLooksEmpty', 'SolutionizeIt', 'JazzItUpALittle', 'WeDoNotDoContracts', 'AllTheActionItems', 'WhenWillItBeDone', 'ThisIsUrgent', 'ItIsAllAboutOrganicGrowth', 'ThinkOutsideTheBox', 'GuerrillaMarketingGuru', 'ProceduralizeIt', 'IncreaseDeliverables', 'LikePuttingSocksOnAnOctopus', 'FutureProofThis', 'JustGonnaChimeIn', 'LeverageOurSynergies', 'SheIsOurGoldenGoose', 'AllHandsOnDeck', 'IAmAnSeoExpert'];
  return officeIpsum[Math.floor(Math.random() * officeIpsum.length)] + '_' + Math.floor(Math.random() * 99);
};

module.exports = random;
