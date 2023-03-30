#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5004

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["DescarTec.Api/DescarTec.Api.csproj", "DescarTec.Api/"]
RUN dotnet restore "DescarTec.Api/DescarTec.Api.csproj"
COPY . .
WORKDIR "/src/descartecapi"
RUN dotnet build "DescarTec.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DescarTec.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DescarTec.Api.dll"]