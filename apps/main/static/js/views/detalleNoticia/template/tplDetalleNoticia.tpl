<div class="header-noticia">
	<div class="text-center">
		<h1><%= title %></h1>
	</div>
	<div>
		<div class="autor-fecha-noticia">
			<div class="autor-datos-noticia">
				<img class="autor-img" src="https://pbs.twimg.com/profile_images/550728010043629568/Z1hoIo_V.jpeg" alt="Julio Grados" alt="">
				<span class="autor-name"><%= author.name %></span>
				<span class="noticia-fecha"><%= fecha %></span>
			</div>
		</div>
	</div>
</div>

<div class="header-noticia">
	<div class="text-center">
		<img src="<%= image %>" alt="">
	</div>
	<div class="noticia-descripcion">
		<span>
			<p>
				<%= description %>
			</p>
		</span>
	</div>
</div>
