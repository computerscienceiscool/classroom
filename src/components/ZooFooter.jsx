import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import SocialFacebookOptionIcon from 'grommet/components/icons/base/SocialFacebookOption';
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter';
import SocialInstagramIcon from 'grommet/components/icons/base/SocialInstagram';
import { ZooniverseLogotype } from 'zooniverse-react-components';

const ZooFooter = (props) => {
  const createKeyedAnchorItem = (navItem, i) => {
    return React.cloneElement(navItem, { key: `navItem-${i}` });
  };

  return (
    <Footer
      className="footer"
      direction="column"
      size="large"
      primary={true}
      colorIndex={props.mainSectionColorIndex}
      pad={{ horizontal: 'none', vertical: 'none' }}
    >
      <Section
        className="footer__section"
        full="horizontal"
        direction="row"
        justify="between"
        pad={{ horizontal: 'large', vertical: 'medium' }}
        margin={{ horizontal: 'large', vertical: 'none' }}
      >
        <div className="footer__logo"><Anchor href="https://www.zooniverse.org"><ZooniverseLogotype /></Anchor><br />People Powered Research</div>
        <Menu className="footer__nav" direction="row">
          {props.socialNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
        </Menu>
      </Section>
      <Section pad={{ horizontal: 'large', vertical: 'none' }} full="horizontal">
        <hr className="footer__divider" />
      </Section>
      <Section direction="row" className="footer__section" pad={{ horizontal: 'large', vertical: 'medium' }}>
        <Columns maxCount={6} masonry={true} size="small" >
          <Menu className="footer__nav">
            {props.projectNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Menu>
          <Menu className="footer__nav">
            {props.aboutNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Menu>
          <Menu className="footer__nav">
            {props.getInvolvedNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Menu>
          <Menu className="footer__nav">
            {props.talkNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Menu>
          <Menu className="footer__nav">
            {props.buildNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Menu>
          <Menu className="footer__nav">
            {props.newsNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Menu>
        </Columns>
      </Section>
      <Section
        className="footer__section--small"
        colorIndex={props.smallSectionColorIndex}
        full="horizontal"
        pad={{ horizontal: 'large', vertical: 'none' }}
        justify="between"
      >
        <Menu className="footer__nav" direction="row" inline={true}>
          {props.policyNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
        </Menu>
        {props.adminContainer &&
          props.adminContainer}
      </Section>
    </Footer>
  );
};

ZooFooter.defaultProps = {
  aboutNavList: [
    <Anchor className="nav__list-header" href="https://www.zooniverse.org/about">About</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/about/publications">Publications</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/about/team">Team</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/about/acknowledgements">Acknowledgements</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/about/contact">Contact</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/about/faq">FAQ</Anchor>
  ],
  adminContainer: null,
  buildNavList: [
    <Anchor className="nav__list-header" href="https://www.zooniverse.org/lab">Build a Project</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/help">Tutorial</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/help/glossary">Glossary</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/help/lab-policies">Policies</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/lab-best-practices/introduction">Best Practices</Anchor>
  ],
  getInvolvedNavList: [
    <Anchor className="nav__list-header" href="https://www.zooniverse.org/get-involved">Get Involved</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/get-involved/education">Education</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/get-involved/call-for-projects">Call for Projects</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/collections">Collections</Anchor>
  ],
  mainSectionColorIndex: "light-1",
  newsNavList: [
    <Anchor className="nav__list-header" href="#">News</Anchor>,
    <Anchor className="nav__list-item" href="https://daily.zooniverse.org/">Daily Zooniverse</Anchor>,
    <Anchor className="nav__list-item" href="https://blog.zooniverse.org/projects">Blog</Anchor>
  ],
  policyNavList: [
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/privacy">Privacy Policy</Anchor>,
    <Anchor className="nav__list-item" href="http://jobs.zooniverse.org/">Jobs</Anchor>,
    <Anchor className="nav__list-item" href="https://status.zooniverse.org/">System Status</Anchor>,
    <Anchor className="nav__list-item" href="https://www.zooniverse.org/security">Security</Anchor>
  ],
  projectNavList: [
    <Anchor className="nav__list-header" href="https://www.zooniverse.org/projects">Projects</Anchor>,
  ],
  smallSectionColorIndex: "light-2",
  socialNavList: [
    // Button with an href behaves like an Anchor.
    // Buttons have to be used because Icons used in Anchors in a Box (or things that are sub-classes of a Box) that has its colorIndex set wiill be opinionated.
    // The styles for a Box in that case will supercede the colorIndex set on the Icon.
    // However there is a related bug: https://github.com/grommet/grommet/issues/1513
    <Button href="https://www.facebook.com/therealzooniverse" a11yTitle="Facebook"><SocialFacebookOptionIcon colorIndex="brand" size="small" /> </Button>,
    <Button href="https://twitter.com/the_zooniverse" a11yTitle="Twitter"><SocialTwitterIcon colorIndex="brand" size="small" /></Button>,
    <Button href="https://www.instagram.com/the.zooniverse/" a11yTitle="Instagram"><SocialInstagramIcon colorIndex="brand" size="small" /></Button>
  ],
  talkNavList: [
    <Anchor className="nav__list-header" href="https://www.zooniverse.org/talk">Talk</Anchor>
  ]
};

ZooFooter.propTypes = {
  aboutNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  adminContainer: PropTypes.node,
  buildNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  getInvolvedNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  mainSectionColorIndex: PropTypes.string,
  newsNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  policyNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  projectNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  smallSectionColorIndex: PropTypes.string,
  socialNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  talkNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired
};

export default ZooFooter;
