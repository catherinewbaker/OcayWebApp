FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# Install Node.js
RUN apt-get update && \
    apt-get install -y nodejs npm

# Copy CSPROJ file and restore packages
COPY ["OcayProject.csproj", "./"]
RUN dotnet restore

# Copy the rest of the source files
COPY . ./

# Publish the application
RUN dotnet publish -c Release -o out

# Second stage: Node.js environment to build the React frontend
FROM node:16 AS node-build
WORKDIR /ClientApp
COPY ClientApp/ ./
RUN npm install
RUN npm run build

# Final stage/runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=node-build /ClientApp/build ./wwwroot

EXPOSE 80
ENTRYPOINT ["dotnet", "OcayProject.dll"]
