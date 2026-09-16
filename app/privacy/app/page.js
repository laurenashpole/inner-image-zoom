import { Container, List, ListItem, Stack, Text, Title } from '@mantine/core';

const ShopifyPrivacy = () => {
  return (
    <Container>
      <Stack gap="lg" py="xxxl">
        <Title order={1}>Privacy Policy — Inner Image Zoom Shopify App</Title>

        <Text fw={700} pb="lg">
          Effective date: September 16, 2026
          <br />
          Last updated: September 16, 2026
        </Text>

        <Text>
          Lauren Ashpole (“we,” “us,” or “our”) operates the Inner Image Zoom
          application for Shopify merchants (“App”). This Privacy Policy
          explains what information we collect, how we use it, and your choices
          when you install or use the App.
        </Text>

        <Stack as="section" gap="lg">
          <Title order={2}>Who this policy applies to</Title>

          <Text>
            This policy applies to merchants who install the App on their
            Shopify store. The App adds product image zoom to the
            merchant&apos;s storefront via a theme app embed. Storefront
            shoppers are not asked to create accounts in our App, and we do not
            intentionally collect personal information from your customers.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Information we collect</Title>

          <Text>
            When you install or use the App, we may collect or receive:
          </Text>

          <Title order={3}>From Shopify (via OAuth and Admin API)</Title>

          <List listStyleType="disc">
            <ListItem>Store domain and shop identifier</ListItem>

            <ListItem>
              OAuth session and access tokens needed to run the App
            </ListItem>

            <ListItem>
              Granted app permissions (read_themes, read_products)
            </ListItem>

            <ListItem>
              Theme and product information needed for onboarding (for example,
              whether the app embed is enabled and a product preview URL)
            </ListItem>

            <ListItem>
              Basic information about the Shopify user who opens the App (such
              as name and email), as provided by Shopify during authentication
            </ListItem>
          </List>

          <Title order={3}>Billing</Title>

          <List listStyleType="disc">
            <ListItem>
              Subscription status is checked through Shopify&apos;s billing
              systems. We do not collect or store payment card details.
            </ListItem>
          </List>

          <Title order={3}>Technical data</Title>

          <List listStyleType="disc">
            <ListItem>
              Standard server logs (for example, request time, IP address, and
              error logs) used to operate and secure the App
            </ListItem>
          </List>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Information we do not collect</Title>

          <Text>
            We do <strong>not</strong> intentionally collect or store:
          </Text>

          <List listStyleType="disc">
            <ListItem>
              Your customers&apos; names, emails, addresses, or order history
            </ListItem>

            <ListItem>Customer browsing behavior on your storefront</ListItem>
            <ListItem>Payment card or bank account information</ListItem>
          </List>

          <Text>
            Product image zoom on your storefront runs through Shopify&apos;s
            theme extension infrastructure. That storefront functionality does
            not send shopper personal data to our servers.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>How we use information</Title>

          <Text>We use the information above to:</Text>

          <List listStyleType="disc">
            <ListItem>Install, authenticate, and operate the App</ListItem>

            <ListItem>
              Show embed status and onboarding in the Shopify admin
            </ListItem>

            <ListItem>
              Verify an active subscription before granting access
            </ListItem>

            <ListItem>
              Respond to mandatory Shopify compliance webhooks
            </ListItem>

            <ListItem>
              Maintain security, troubleshoot issues, and improve reliability
            </ListItem>
          </List>

          <Text>We do not sell your personal information.</Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>How we share information</Title>

          <Text>We share information only as needed to run the App:</Text>

          <List listStyleType="disc">
            <ListItem>
              Shopify — hosting, authentication, billing, webhooks, and API
              access
            </ListItem>

            <ListItem>Railway — application hosting</ListItem>

            <ListItem>
              PostgreSQL database provider (via Railway) — encrypted storage of
              OAuth session data
            </ListItem>
          </List>

          <Text>
            We may also disclose information if required by law or to protect
            our rights, users, or the public.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Data retention</Title>

          <List listStyleType="disc">
            <ListItem>
              OAuth sessions are stored while the App is installed and are
              deleted when you uninstall the App or when we receive a applicable
              data-deletion webhook from Shopify.
            </ListItem>

            <ListItem>
              Server logs are kept for a limited period for security and
              troubleshooting, then deleted or aggregated.
            </ListItem>
          </List>

          <Text>
            Because we do not store customer data, customer data export or
            erasure requests typically do not apply to data held by us.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Your rights and Shopify&apos;s privacy tools</Title>

          <Text>
            Merchants can uninstall the App at any time from Shopify admin,
            which revokes our API access and triggers deletion of stored session
            data.
          </Text>

          <Text>
            If you are a merchant subject to privacy laws (such as GDPR or
            CPRA), you may contact us using the details below. Shopify also
            provides tools for merchants to handle customer privacy requests;
            our App responds to Shopify&apos;s mandatory compliance webhooks as
            required for App Store apps.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Security</Title>

          <Text>
            We use industry-standard measures to protect data in transit and at
            rest, including HTTPS and access controls on our hosting
            infrastructure. No method of transmission or storage is completely
            secure.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>International transfers</Title>

          <Text>
            Our service providers may process data in the United States or other
            countries. By using the App, you understand that information may be
            transferred to jurisdictions with different data protection laws.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Children</Title>

          <Text>
            The App is intended for merchants and is not directed to children.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Changes to this policy</Title>

          <Text>
            We may update this Privacy Policy from time to time. We will post
            the updated version at this URL and change the “Last updated” date
            above. Continued use of the App after changes means you accept the
            revised policy.
          </Text>
        </Stack>

        <Stack as="section" gap="lg">
          <Title order={2}>Contact us</Title>

          <Text>
            If you have questions about this Privacy Policy or our data
            practices, contact lauren@laurenashpole.com.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ShopifyPrivacy;
