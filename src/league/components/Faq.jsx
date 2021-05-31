import React from 'react'
import {CLIENT_URL} from '../../utils/constants'

class Faq extends React.Component {

  render() {
    return (
      <div align={'left'}>
        <br/>
        <h3>How to guarantee a stack when late?</h3>
        <p>If you are a Yes on the evite OR have texted someone saying you are playing then you are guaranteed a stack
          until the final table.</p>

        <h3>How to get the bonus chip?</h3>
        <p>
          To get the $500 bonus chip you have to have paid before the first hand is dealt (i.e. before the clock starts
          and 'shuffle up and deal' is proclaimed).
          <br/>
          <b>Coung rule:</b> You cannot get the bonus chip and then leave the game for an extended time (e.g. you can
          make a phone call but you cannot drive somewhere else).
        </p>

        <h3>What are the TOC age requirements?</h3>
        <p>
          A player who will turn 18-20 before or during the May after that TOC season may play the TOC under the condition that they play in a WSOP Circuit event that next season at a Casino that allows 18+ players or a European WSOP stop that allows 18+ players.
          <br/><br/>This rule does not apply to players 21 and over. If a player is 21 or over they must still play in the WSOP in Vegas or the European WSOP.
        </p>

        <h3>How do I qualify (games/points) for TOC?</h3>
        <p>
          In order to qualify for the final table or the play-in table, a player must have played in the TOC at least 10 times OR earned 250 points.
        </p>

        <h3>How does the TOC affect the chop?</h3>
        <p>
          If players want to chop (assuming at least one of the players is a TOC member) they may chop the money, but must play for a minimum of $50 (as an incentive play their best).
        </p>

        <h3>Who is qualified to vote on TOC issues?</h3>
        <p>
          Starting in 2014, you must have played as a TOC member at least one time the previous year to vote in the annual "TOC rule changes" survey.
        </p>

        <h3>How is the TOC prize pot determined?</h3>
        <p>
          There are three types of season payouts
          <ul>
            <li>Guaranteed payout - this is handed over to the top place(s)</li>
            <li>Final Table payouts - these are the payouts for the places for those that qualify to play in the final table</li>
            <li>Cash - there may be a cash payout (this money does not need to go towards an
                approved WSOP equivalent event)</li>
          </ul>
          The payouts are determined by a sliding scale. For example the 2019-2020 season has different
          payouts depending on if the TOC money collected is in the following ranges
          <ul>
            <li>$16,000 - $20,000</li>
            <li>$20,000 - $24,000</li>
            <li>$24,000 - $28,000</li>
          </ul>
          The season payouts can be seen by looking at the Season page of this application.
          <p>
          See <a href={CLIENT_URL + '/TOCPayoutStructure2019-2020.xlsx'}>TOCPayoutStructure2019-2020.xlsx</a>
            &nbsp; for the spreadsheet that is used to determine the payouts for the 2019-2020 season.
          </p>
        </p>

        <h3>How does the chop work?</h3>
        <p>
          Chopping points or money works the same way. An example should be explanation enough.
          <br/><b>1st and 2nd place chop</b>
          <br/>Assume the following:
          <ul>
            <li>1st place has 75,000 chips</li>
            <li>2nd place has 25,000 chips</li>
            <li>1st place points (or money) is 67</li>
            <li>1st place points (or money) is 33</li>
          </ul>
          So 1st place is 75%, 2nd place is 25% and the total points (money) is 100.
          <br/>
          What <b>not to do</b> is add together the points (money) and apply the percentages
          (i.e. 1st place gets 75 points (money) and 2nd place gets 25 points (money).
          <br/>
          <br/>
          The way is works is to give both players 2nd place points (money) and then apply the
          percentages to what is left over.
          <br/>
          <ol>
            <li>1st place gets 2nd place points (money) = 33</li>
            <li>2nd place gets 2nd place points (money) = 33</li>
            <li>That leaves 34 points left to chop</li>
            <li>1st place gets another 34 * .75 = 25.5</li>
            <li>2nd place gets another 34 * .25 = 8.5</li>
            <li>1st place gets a total of 58.5 (33 + 25.5)</li>
            <li>2nd place gets a total of 41.5 (33 + 8.5)</li>
          </ol>
          <b>1st, 2nd and 3rd place chop</b>
          <br/>In this case all three get 3rd place points (money) and the rest is chopped.
          <br/><b>Is there a ceiling on 1st place?</b>
          <br/>Yes. The algorithm prevents 1st place from getting more than 1st place points.
          For example if 1st place is 100 points with no chop then
          1st place cannot get more than 100 points if there is a chop.
        </p>

        <h3>How is the TOC prize pot distributed?</h3>
        <p>
          <ol>
            <li>You have to provide the TOC with a flight confirmation to Vegas to get your prize money. You send the confirmation, we hand you a check.</li>
            <li>Only $1,000 can come off the table in cash. In other words we will only give $1,000 out in total without a flight confirmation to Vegas. There is an order of preference for this $1,000 cash payout. The pecking order is:
              <ol type="a">
                <li>Regular season winner</li>
                <li>Regular season runner-up</li>
                <li>1st place on the final table, then 2nd place on the final table, then 3rd place and so on</li>
                <li>2nd place on play-in table, then 3rd place on play-in table, and so on</li>
              </ol>
            </li>
            <li>So, let's assume the regular season winner and regular season runner-up have already shown flight reservations, so let's not worry about them and assuming no final table chop:
              <ol type="a">
                <li>If 1st place on the final table can't go to Vegas, he gets the $1,000 cash prize and the $1,000 he forfeits goes to 5th place on the TOC table now giving that person a total of $2,000 (the $1,000 original prize 5th place won + $1,000 from the forfeited prize) as long as the 5th place person provides the TOC with a flight confirmation to Vegas. If the 5th place person can't provide the TOC with a flight confirmation to Vegas, they get nothing and the $2,000 moves down to the next person on the pecking order and so on and so on.</li>
                <li>If 1st place on the final table can go to Vegas, but 2nd place can't, 2nd place gets the $1,000 cash prize and the $1,000 he forfeits goes to 5th place.....(see above paragraph for rest).</li>
                <li>If 1st place and 2nd place on the final table can go to Vegas, but 3rd place can't, 3rd place gets the $1,000 cash prize and the $1,000 he forfeits goes to 5th place.....(see above paragraph for rest).</li>
                <li>If 1st, 2nd, and 3rd place on the final table can go to Vegas, but 4th place can't, 4th place gets the $1,000 cash prize and the $1,000 he forfeits goes to 5th place.....(see above paragraph for rest).</li>
              </ol>
            </li>
            <li>If more than one of the 1st, 2nd, 3rd, and 4th place finishers on the Final Tablecan't go to Vegas, they will split the $1,000 cash prize and both of their forfeited $2,000 prizes will move down the pecking order until two people provide the TOC with a flight confirmation to Vegas.</li>
            <li>If the TOC does not have a flight confirmation from you three weeks before the first WSOP event, you are deemed to have forfeited your prize and will be receiving the cash payout. Why three weeks? Because the next guy down the pecking order should have three weeks notice to plan his trip.</li>
          </ol>
        </p>
      </div>
    )
  }
}

export default Faq
