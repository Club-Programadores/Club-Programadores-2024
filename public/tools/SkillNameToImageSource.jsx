export default function skillNameToImageSource(nombreSkill) {
  nombreSkill = nombreSkill.toLowerCase();

  switch (nombreSkill) {
    case "html":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg";
    case "css":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg";
    case "java":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
    case "c":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-line.svg";
    case "python":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    case "rust":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg";
    case "ruby":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg";
    case "flutter":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg";
    case "php":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg";
    case "lua":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original-wordmark.svg";
    case "go":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg";
    case "react":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg";
    case "flask":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg";
    case "bootstrap":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg";
    case "blender":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg";
    case "wordpress":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg";
    case "vue":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg";
    case "svelte":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg";
    case "sqlite":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original-wordmark.svg";
    case "mysql":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg";
    case "postgresql":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
    case "graphql":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain-wordmark.svg";
    case "mongodb":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg";
    case "oracle":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg";
    case "sass":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg";
    case "redux":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg";
    case "redis":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg";
    case "nodejs":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg";
    case "git":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg";
    case "github":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg";
    case "docker":
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg";
    case "sparql":
      return "https://www.pngrepo.com/download/374091/sparql.png";
  }

  if (nombreSkill == "js" || nombreSkill == "javascript") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  }
  if (nombreSkill == "c++" || nombreSkill == "cplusplus") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-line.svg";
  }
  if (nombreSkill == "c#" || nombreSkill == "csharp") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-line.svg";
  }
  if (nombreSkill == "three" || nombreSkill == "threejs") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg";
  }
  if (nombreSkill == ".net" || nombreSkill == "dotnet") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg";
  }
  if (
    nombreSkill == "tailwinds" ||
    nombreSkill == "tailwinds" ||
    nombreSkill == "tailwindscss"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg";
  }
  if (
    nombreSkill == "ts" ||
    nombreSkill == "type_script" ||
    nombreSkill == "typescript" ||
    nombreSkill == "type script"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  }

  if (
    nombreSkill == "vscode" ||
    nombreSkill == "visual studio code" ||
    nombreSkill == "visual_studio_code" ||
    nombreSkill == "vsc"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg";
  }
  if (
    nombreSkill == "vs" ||
    nombreSkill == "visual studio" ||
    nombreSkill == "visual_studio"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg";
  }
  if (
    nombreSkill == "microsoftsqlserver" ||
    nombreSkill == "microsoft_sql_server" ||
    nombreSkill == "microsoft sql server"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain-wordmark.svg";
  }

  if (
    nombreSkill == "unrealengine" ||
    nombreSkill == "unreal engine" ||
    nombreSkill == "unreal"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg";
  }
  if (
    nombreSkill == "unityengine" ||
    nombreSkill == "unity engine" ||
    nombreSkill == "unity"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg";
  }
  if (
    nombreSkill == "godot" ||
    nombreSkill == "godot engine" ||
    nombreSkill == "godot_engine"
  ) {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg";
  }
}
