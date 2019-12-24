# Kross-agency

Simple starter boilerplate for markup development of sites.<br>
Use Gulp 4, Babel, AutoPrefixer, SCSS, webp

# Info
<a href='https://drive.google.com/open?id=1Gzs0UlFd1iKxJ4YQ7TzfhWR6wLnhJ2Dk'><b>Link to design</b><a/> 

# Usage
<pre>
  <code>
    git clone https://github.com/antipenko/kross-agency
    git remote remove origin
    npm i
    gulp
  </code>
</pre>
  
# Рабочий процесс
<ol>
  <li>Берете задачу</li>
  <li>Создайте у себя локально ветку: <br>
    <div>Ветки именуем: ka-название-ветки-описывающие-что-нужно в ней сделать</div>
    <pre>
      <code>git checkout -b "ka-create-header"</code>
    </pre>
  </li>
  <li>В процессе работы после каждого важного изменения делаем коммит описывающий, что в нем было сделано. <br>
      Перед созданием коммита выполняем в консоли комаду:
    <pre>
      <code>npm run styleLint</code>
    </pre>
    </br>
    Он проверит на наличие ошибок в написании scss кода. Если ошибки есть, то нужно их все исправить.
    <a href='https://monosnap.com/file/3bOEviCNGuFrLs0HX19rOZA70klfyr'>Пример вывода ошибок</a>
    <br>если нет то можете создавать коммит:
    <pre>
      <code>git add [список измененных файлов]</code>
      <code>git commit -m "Описание коммита"</code>
      <code>git push origin имя-ветки-на-которой-работаете</code>
    </pre>
  </li>
</ol>
