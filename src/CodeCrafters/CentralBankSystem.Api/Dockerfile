FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["CentralBankSystem.Api.csproj", "./"]
RUN dotnet restore "./CentralBankSystem.Api.csproj"

COPY . .
RUN dotnet build "CentralBankSystem.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CentralBankSystem.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CentralBankSystem.Api.dll"]