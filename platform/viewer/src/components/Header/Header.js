import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown, AboutContent, withModal } from '@ohif/ui';
//
import { UserPreferences } from './../UserPreferences';
import OHIFLogo from '../OHIFLogo/OHIFLogo.js';
import './Header.css';
import { GrConfigure } from "react-icons/gr";
import { IconContext } from "react-icons";

function Header(props) {
  const {
    t,
    user,
    userManager,
    modal: { show },
    useLargeLogo,
    linkPath,
    linkText,
    location,
    children,
  } = props;

  const [options, setOptions] = useState([]);
  const hasLink = linkText && linkPath;

  useEffect(() => {
    const optionsValue = [
      // {
      //   title: t('About'),
      //   icon: { name: 'info' },
      //   onClick: () =>
      //     show({
      //       content: AboutContent,
      //       title: t('mConnect Viewer - About'),
      //     }),
      // },
      {
        title: t('Preferences'),
        icon: {
          name: 'user',
        },
        onClick: () =>
          show({
            content: UserPreferences,
            title: t('User Preferences'),
          }),
      },
    ];

    if (user && userManager) {
      optionsValue.push({
        title: t('Logout'),
        icon: { name: 'power-off' },
        onClick: () => userManager.signoutRedirect(),
      });
    }

    setOptions(optionsValue);
  }, [setOptions, show, t, user, userManager]);

  var title1;
  var onclick1;
  options.map((({ icon, title, link, onClick }, key) => {
    title1 = title;
    onclick1 = onClick;
  }));
  let preferencias;
  if (screen.width > 1000) {
    preferencias = <div className="header-menu">
      <div style={{ backgroundColor: '#4f8c81', color: 'white' }} className="btn btn-primary" onClick={onclick1}>
        <IconContext.Provider value={{ color: "white" }}>
          <div>
            <GrConfigure />
          </div>
        </IconContext.Provider>
      </div>
    </div>;
  }
  if (hasLink) {
    return (
      <>
        {/* <div className="notification-bar">{t('INVESTIGATIONAL USE ONLY')}</div> */}
        <div
          className={classNames('entry-header', { 'header-big': useLargeLogo })}
        >
          <div className="header-left-box">
            {hasLink && (
              <Link
                className="header-btn header-studyListLinkSection"
                to={{
                  pathname: linkPath,
                  state: { studyLink: location.pathname },
                }}
              >
                {/* {t(linkText)} */}
                {/* <IconContext.Provider value={{ color: "blue", size: '2em' }}>
                  <BsArrowLeft></BsArrowLeft>
                </IconContext.Provider> */}
                Lista de Estudos
              </Link>
            )}

          </div>
          {preferencias}
        </div>
      </>
    );
  } else {

    return <div
      className={classNames('entry-header', { 'header-big': useLargeLogo })}
    >
      <div className="header-menu">
        {/* <span className="research-use">{t('INVESTIGATIONAL USE ONLY')}</span> */}
        {preferencias}
        {/* <Dropdown title={t('Options')} list={options} align="right" /> */}
      </div>
    </div>;
  }
}

Header.propTypes = {
  // Study list, /
  linkText: PropTypes.string,
  linkPath: PropTypes.string,
  useLargeLogo: PropTypes.bool,
  //
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  userManager: PropTypes.object,
  user: PropTypes.object,
  modal: PropTypes.object,
};

Header.defaultProps = {
  useLargeLogo: false,
  children: OHIFLogo(),
};

export default withTranslation(['Header', 'AboutModal'])(
  withRouter(withModal(Header))
);
