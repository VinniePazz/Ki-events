import React from "react";

function HomePage({ history }) {
  return (
    <>
      {/* <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo.png"
              alt="logo"
            />
            <div className="content">Re-vents</div>
          </h1>
          <h2>Do whatever you want to do</h2>
          <div onClick={() => history.push('/events')} className="ui huge white inverted button">
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div> */}
			<header className="bg">
				<div className="slogan">
					<p>Планируйте встречи</p>
					<p>Приглашайте друзей</p>
					<p>Будьте счастливы</p>
					<div onClick={() => history.push('/events')} className="ui huge blue bacis inverted button">
            Начать
            <i className="right arrow icon" />
          </div>
				</div>
			</header>
    </>
  );
}

export default HomePage;
