# Building phase
FROM node:14-buster as builder

LABEL description="portfolio page"
LABEL project="portfolio"
LABEL maintainer="florian.porada@gmail.com"

# Run those steps during build phase
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install gatsby for building this shiaat
RUN yarn global add gatsby-cli

# Copy files
ADD . ./

# Install modules
RUN yarn

# Add env vars via build-args
ARG GATSBY_MAPBOX_API_TOKEN_ARG=unknown
ENV GATSBY_MAPBOX_API_TOKEN $GATSBY_MAPBOX_API_TOKEN_ARG

ENV GATSBY_TELEMETRY_DISABLED 1

# Build app
RUN gatsby build

# Production phase
FROM gatsbyjs/gatsby:latest

# unknown is the default, but you can override it with --build-arg APP_VERSION=0.0.1 during docker build
ARG APP_VERSION=unknown
ENV APP_VERSION $APP_VERSION

# production is the default, but you can override it with --build-arg NODE_ENV=development during docker build
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# google tag manager id
ARG GTAG_ID=''
ENV GATSBY_GTAG_ID $GTAG_ID

# google analytics id
ARG GA_ID=''
ENV GATSBY_GA_ID $GA_ID

# Disable telemetry
ENV GATSBY_TELEMETRY_DISABLED 1


# unknown is the default, but you can override it with --build-arg RELEASE_DATE=$(date +"%Y/%m/%d") during docker build
ARG RELEASE_DATE=unknown
LABEL com.florianporada.author="florianporada" \
  com.florianporada.release-date=$RELEASE_DATE \
  com.florianporada.release-version=$APP_VERSION

COPY --from=builder /usr/src/app/public /pub
