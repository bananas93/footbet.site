var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Bets = require('../models/Bets');

const calcultePoints = async (id, matchHome, matchAway) => {
    const users = User.find().then((users) => {
        users.forEach((user) => {
            const results = user.results;
            bets = Bets.findOne({ match: id, user: user._id}).then((bet) => {
                if (bet) {
                    let homeBet = bet.bet.home;
                    let awayBet = bet.bet.away;
                    matchHome = parseInt(matchHome);
                    matchAway = parseInt(matchAway);
                    if (matchHome === homeBet && matchAway === awayBet) {
                        results.score += 1;
                    }
                    else if (matchHome > matchAway && homeBet > awayBet) {
                        results.result += 1;
                    }
                    else if (matchHome < matchAway && homeBet < awayBet) {
                        results.result += 1;
                    }
                    else if (matchHome === matchAway && homeBet === awayBet && matchHome != homeBet) {
                        results.result += 1;
                    }
                    if ((matchHome + matchAway >= 5 && homeBet + awayBet >= 5) && (matchHome === homeBet && $away === awayBet)) {
                        results.goals5 += 1;
                    }
                    if (matchHome - matchAway === homeBet - awayBet) {
                        results.difference += 1;
                    }
                    results.all = (results.result * 2) + (results.score * 4);
                    results.all += results.goals5;
                    results.all += results.difference;
                    User.updateOne({ _id: user._id } , {$set: { "results": results }})
                    .then((resp) => console.log(resp))
                    .catch((err) => console.error(err))
                }
            })
        });
    });
    // users.forEach((user) => {
    //     bets = Bets.findOne({ match: id }).then((bet) => {
    //         console.log('bet', bet);
    //         const results = user.results;
    //         let homeBet = bet.bet.home;
    //         let awayBet = bet.bet.away;
    //         if (matchHome === homeBet && matchAway === awayBet) {
    //             results.score += 1;
    //         }
    //         else if (matchHome > matchAway && homeBet > awayBet) {
    //             results.result += 1;
    //         }
    //         else if (matchHome < matchAway && homeBet < awayBet) {
    //             results.result += 1;
    //         }
    //         else if (matchHome === matchAway && homeBet === awayBet && matchHome != homeBet){
    //             results.result += 1;
    //         }
    //         if ((matchHome + matchAway >= 5 && homeBet + awayBet >= 5) && (matchHome === homeBet && $away === awayBet)) {
    //             results.goals5 += 1;
    //         }
    //         if (matchHome - matchAway === homeBet - awayBet) {
    //             results.difference += 1;
    //         }
    //         results.all = (results.result * 2) + (results.score * 4);
    //         results.all += results.goals5;
    //         results.all += results.difference;
    //         console.log(results)
    //         return results;
    //     })
    // });
}

module.exports = calcultePoints;