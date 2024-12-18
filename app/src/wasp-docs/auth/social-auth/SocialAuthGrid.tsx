import React from 'react'
import './SocialAuthGrid.css'

export function SocialAuthGrid({
  pagePart = '', // e.g. #overrides
}) {
  const authMethods = [
    {
      title: 'Google',
      description: 'Users sign in with their Google account.',
      linkToDocs: '/docs/auth/social-auth/google' + pagePart,
    },
    {
      title: 'Github',
      description: 'Users sign in with their Github account.',
      linkToDocs: '/docs/auth/social-auth/github' + pagePart,
    },
    {
      title: 'Keycloak',
      description: 'Users sign in with their Keycloak account.',
      linkToDocs: '/docs/auth/social-auth/keycloak' + pagePart,
    },
    {
      title: 'Discord',
      description: 'Users sign in with their Discord account.',
      linkToDocs: '/docs/auth/social-auth/discord' + pagePart,
    },
  ]
  return (
    <>
      <div className="social-auth-grid">
        {authMethods.map((authMethod) => (
          <AuthMethodBox
            title={authMethod.title}
            description={authMethod.description}
            linkToDocs={authMethod.linkToDocs}
          />
        ))}
      </div>
      <p className="social-auth-info">
        <small>Click on each provider for more details.</small>
      </p>
    </>
  )
}

function AuthMethodBox({
  title,
  description,
}: {
  linkToDocs: string
  title: string
  description: string
}) {
  return (
    <>
      <h3>{title} »</h3>
      <p>{description}</p>
    </>
  )
}
