/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Headroom from "react-headroom"

import "./layout.css"

const Main = styled.main`
  margin: 0 auto;
`

const NavLink = styled.div`
  margin: auto 0;

  a {
    color: white;
    padding: 0 16px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    &:hover {
      color: orange;
    }
  }
`
const Header = styled.header`
  display: flex;
  background: black;
  padding: 0 16px;
  height: 66px;
  box-sizing: border-box;
`
const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
`
const Branding = styled.div`
  color: orange;
  font-weight: bold;
  margin: auto 0;
  font-size: 20px;
`

const Layout = ({ children }) => {
  return (
    <>
      <Headroom>
        <Header>
          <StaticQuery
            query={`${navigationQuery}`}
            render={data => {
              console.log(data)
              return (
                <>
                  <Branding>
                    {data.prismic.allNavigations.edges[0].node.branding}
                  </Branding>
                  <NavLinks>
                    {data.prismic.allNavigations.edges[0].node.navigation_links.map(
                      link => {
                        return (
                          <NavLink key={link.link._meta.uid}>
                            <Link to={`/${link.link._meta.uid}`}>
                              {link.label}
                            </Link>
                          </NavLink>
                        )
                      }
                    )}
                  </NavLinks>
                </>
              )
            }}
          />
        </Header>
      </Headroom>
      <Main>{children}</Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const navigationQuery = graphql`
  {
    prismic {
      allNavigations {
        edges {
          node {
            branding
            navigation_links {
              label
              link {
                ... on PRISMIC_Page {
                  _meta {
                    uid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
