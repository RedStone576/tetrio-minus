fetch("https://tetr.io/tetrio.js").then(y => y.text()).then(x => eval(replace(x)))

function replace(h)
{
  h = h
  .replace(
    `<img src="/res/verified.png" title="Verified" />':""`,
    `<img src="/res/verified.png" title="Verified" />':(i._id === "6031fedbaa921e2fb0c7153b" ? '<img src="/res/emotes/bigflush.png" />' : "")`
  )
  .replace(
    '.png" title="Verified" />`:""',
    '.png" title="Verified" />`: (i.user._id === "6031fedbaa921e2fb0c7153b" ? \'<img src="/res/emotes/bigflush.png" />\' : "")'
  )
  .replace(
    '.classList.add("scroller_player")',
    '.classList.add("scroller_player"),(()=>{const roleColorH = {"anon": "background-color: #262626;border-top: 3px solid #2a2a2a;border-right: 3px solid #222;border-bottom: 3px solid #131313;","bot" : "background-color: #582957;border-top: 3px solid #6b2b69;border-right: 3px solid #331933;border-bottom: 3px solid #2e162e;","user" : i.verified ? "background-color: #582957;border-top: 3px solid #6b2b69;border-right: 3px solid #331933;border-bottom: 3px solid #2e162e;" : (i.supporter ? "background-color: #582929;border-top: 3px solid #6b2b2b;border-right: 3px solid #3e1c1c;border-bottom: 3px solid #2e1616;" : ""),"mod" : "background-color: #1e2a48;border-top: 3px solid #1d3164;border-right: 3px solid #1c263e;border-bottom: 3px solid #0e0f13;","admin" : "background-color: #1e2a48;border-top: 3px solid #1d3164;border-right: 3px solid #1c263e;border-bottom: 3px solid #0e0f13;"}; c.style.cssText = i.bracket == "player" ? `${roleColorH[i.role]}` : "";} )()'
  )
  .replace(
  ',r.style.order="spectator"',
  ',(() => {const roleColorH = {"anon": "background-color: #262626;border-top: 3px solid #2a2a2a;border-right: 3px solid #222;border-bottom: 3px solid #131313;","bot" : "background-color: #582957;border-top: 3px solid #6b2b69;border-right: 3px solid #331933;border-bottom: 3px solid #2e162e;","user" : i.verified ? "background-color: #582957;border-top: 3px solid #6b2b69;border-right: 3px solid #331933;border-bottom: 3px solid #2e162e;" : (i.supporter ? "background-color: #582929;border-top: 3px solid #6b2b2b;border-right: 3px solid #3e1c1c;border-bottom: 3px solid #2e1616;" : ""),"mod" : "background-color: #1e2a48;border-top: 3px solid #1d3164;border-right: 3px solid #1c263e;border-bottom: 3px solid #0e0f13;","admin" : "background-color: #1e2a48;border-top: 3px solid #1d3164;border-right: 3px solid #1c263e;border-bottom: 3px solid #0e0f13;"}; c.style.cssText = i.bracket == "player" ? `${roleColorH[i.role]}` : "";})(),r.style.order="spectator"'
  )
  
  // .replace(
  //   '.classList.add("scroller_player")',
  //   '.classList.add("scroller_player"),(()=>{const arrayColorH = ["#333333", "#00383C", "#2B4B51", "#512B2C", "#513B2B", "#1c263e", "#582957"];c.style.cssText = i.bracket == "player" ? `background-color: ${arrayColorH[Math.floor(Math.random() * arrayColorH.length)] + ";border-bottom: 3px solid rgba(0, 0, 0, 0.4);border-right: 3px solid rgba(0, 0, 0, 0.2);border-top: 3px solid rgba(255, 255, 255, 0.06);"}` : ""})()'
  // )
  // .replace(
  // ',r.style.order="spectator"',
  // ',(() => {const arrayColorH = ["#333333", "#00383C", "#2B4B51", "#512B2C", "#513B2B", "#1c263e", "#582957"];c.style.cssText = i.bracket == "spectator" ? "" : `background-color: ${arrayColorH[Math.floor(Math.random() * arrayColorH.length)] + ";border-bottom: 3px solid rgba(0, 0, 0, 0.4);border-right: 3px solid rgba(0, 0, 0, 0.2);border-top: 3px solid rgba(255, 255, 255, 0.06);"}`})(),r.style.order="spectator"'
  // )
  
  return h
}
