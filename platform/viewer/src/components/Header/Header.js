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
import { BsArrowLeft } from "react-icons/bs";
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
      {
        title: t('About'),
        icon: { name: 'info' },
        onClick: () =>
          show({
            content: AboutContent,
            title: t('mConnect Viewer - About'),
          }),
      },
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
        </div>
      </>
    );
  } else {
    return '';
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
