#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5004

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["descartec-api/descartec-api.csproj", "descartec-api/"]
RUN dotnet restore "descartec-api/descartec-api.csproj"
COPY . .
WORKDIR "/src/descartec-api"
RUN dotnet build "descartec-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "descartec-api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "descartec-api.dll"]