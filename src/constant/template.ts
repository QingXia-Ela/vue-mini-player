export default "<div v-scope id=\"CoreWrapper\" v-wrapper-adsorb @mouseup=\"wrapperMouseUp\"" +
  "@mousedown=\"clearHiddenTimer\" @vue:mounted=\"onMounted\" :class=\"`player_module ${dragging ? 'dragging': ''} ${onRight ? 'right' : 'left'} ${hidden && !hover ? 'hidden' : ''}`\">" +
  "<div class=\"left_arrow\" @click=\"clickShow\">" +
  "<i class=\"iconfont icon-24gl-arrowLeft3\">" +
  "</i>" +
  "</div>" +
  "<div class=\"operate_box\" @mousedown=\"wrapperMouseDown\" @mouseenter=\"wrapperMouseEnter\"" +
  "@mouseleave=\"wrapperMouseLeave\">" +
  "<div class=\"left_img\" :style=\"`background-image: url(${currentSongInfo.img ? currentSongInfo.img  : './src/assets/icon.jpg'});`\">" +
  "</div>" +
  "<div class=\"right_operate\">" +
  "<div class=\"song_name\" v-draggable=\"#CoreWrapper\">" +
  "<span class=\"name\">" +
  "{{ currentSongInfo.name }}" +
  "</span>" +
  "<span class=\"time\">" +
  "{{ mediaCurrentTime }}/{{ mediaDuration }}" +
  "</span>" +
  "</div>" +
  "<div class=\"operation_button\">" +
  "<i class=\"iconfont icon-24gl-volumeZero\" v-if=\"store.IsMute\" @click=\"store.SwitchMute\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-volumeMiddle\" v-else @click=\"store.SwitchMute\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-previousCircle\" @click=\"store.PrevSong\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-pauseCircle\" v-if=\"store.IsPlaying\" @click=\"CorePause\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-playCircle\" v-else @click=\"CorePlay\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-nextCircle\" @click=\"store.NextSong\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-arrowRight\" v-if=\"store.PlayMode === 1\" data-mode-id=\"1\"" +
  "@click=\"store.SwitchPlayMode\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-repeat2\" v-else-if=\"store.PlayMode === 2\"" +
  "data-mode-id=\"2\" @click=\"store.SwitchPlayMode\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-repeatOnce2\" v-else-if=\"store.PlayMode === 3\"" +
  "data-mode-id=\"3\" @click=\"store.SwitchPlayMode\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-shuffle\" v-else @click=\"store.SwitchPlayMode\"" +
  "data-mode-id=\"4\">" +
  "</i>" +
  "</div>" +
  "<div class=\"slider\" @click.stop.prevent>" +
  "<div class=\"track\" @mousedown=\"jumpTime\">" +
  "<div class=\"active_track\" :style=\"`width: ${showupPrecentage}%;`\">" +
  "</div>" +
  "</div>" +
  "<div class=\"thumb\" :style=\"`left: ${showupPrecentage}%;`\">" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "<div class=\"right_arrow\" @click=\"clickShow\">" +
  "<i class=\"iconfont icon-24gl-arrowRight3\">" +
  "</i>" +
  "</div>" +
  "<div class=\"show_list_button\" @click=\"switchListShow\">" +
  "</div>" +
  "<div :class=\"`list_box player_module ${showList ? 'show' : ''}`\" @mouseenter=\"wrapperMouseEnter\"" +
  "@mouseleave=\"wrapperMouseLeave\">" +
  "<div class=\"empty_tips\" v-if=\"store.SongIdList.length === 0\">" +
  "No Data :(" +
  "</div>" +
  "<div :class=\"`song_item ${i.id === store.CurrentSongId ? 'current' : ''}`\"" +
  "v-for=\"(i, index) in songInfoList\" @dblclick=\"CorePlaySelectSong(i.id)\">" +
  "<div class=\"title\">" +
  "{{ i.name }}" +
  "</div>" +
  "<div class=\"function_button\">" +
  "<i class=\"iconfont icon-24gl-playCircle\" @click=\"store.PlaySelectSong(i.id)\">" +
  "</i>" +
  "<i class=\"iconfont icon-24gl-trash2\" @click=\"store.RemoveSong(i.id)\">" +
  "</i>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>";

/**
  <div v-scope id="CoreWrapper" v-wrapper-adsorb @mouseup="wrapperMouseUp" @mousedown="clearHiddenTimer"
    @vue:mounted="onMounted"
    :class="`player_module ${dragging ? 'dragging': ''} ${onRight ? 'right' : 'left'} ${hidden && !hover ? 'hidden' : ''}`">
    <div class="left_arrow" @click="clickShow">
      <i class="iconfont icon-24gl-arrowLeft3"></i>
    </div>
    <div class="operate_box" @mousedown="wrapperMouseDown" @mouseenter="wrapperMouseEnter"
      @mouseleave="wrapperMouseLeave">
      <div class="left_img"
        :style="`background-image: url(${currentSongInfo.img ? currentSongInfo.img  : './src/assets/icon.jpg'});`">
      </div>
      <div class="right_operate">
        <div class="song_name" v-draggable="#CoreWrapper">
          <span class="name">{{ currentSongInfo.name }}</span>
          <span class="time">{{ mediaCurrentTime }}/{{ mediaDuration }}</span>
        </div>
        <div class="operation_button">
          <i class="iconfont icon-24gl-volumeZero" v-if="store.IsMute" @click="store.SwitchMute"></i>
          <i class="iconfont icon-24gl-volumeMiddle" v-else @click="store.SwitchMute"></i>
          <i class="iconfont icon-24gl-previousCircle" @click="store.PrevSong"></i>
          <i class="iconfont icon-24gl-pauseCircle" v-if="store.IsPlaying" @click="CorePause"></i>
          <i class="iconfont icon-24gl-playCircle" v-else @click="CorePlay"></i>
          <i class="iconfont icon-24gl-nextCircle" @click="store.NextSong"></i>
          <i class="iconfont icon-24gl-arrowRight" v-if="store.PlayMode === 1" data-mode-id="1"
            @click="store.SwitchPlayMode"></i>
          <i class="iconfont icon-24gl-repeat2" v-else-if="store.PlayMode === 2" data-mode-id="2"
            @click="store.SwitchPlayMode"></i>
          <i class="iconfont icon-24gl-repeatOnce2" v-else-if="store.PlayMode === 3" data-mode-id="3"
            @click="store.SwitchPlayMode"></i>
          <i class="iconfont icon-24gl-shuffle" v-else @click="store.SwitchPlayMode" data-mode-id="4"></i>
        </div>
        <div class="slider" @click.stop.prevent>
          <div class="track" @mousedown="jumpTime">
            <div class="active_track" :style="`width: ${showupPrecentage}%;`"></div>
          </div>
          <div class="thumb" :style="`left: ${showupPrecentage}%;`"></div>
        </div>
      </div>
    </div>
    <div class="right_arrow" @click="clickShow">
      <i class="iconfont icon-24gl-arrowRight3"></i>
    </div>
    <div class="show_list_button" @click="switchListShow"></div>
    <div :class="`list_box player_module ${showList ? 'show' : ''}`" @mouseenter="wrapperMouseEnter"
      @mouseleave="wrapperMouseLeave">
      <div class="empty_tips" v-if="store.SongIdList.length === 0">No Data :(</div>
      <div :class="`song_item ${i.id === store.CurrentSongId ? 'current' : ''}`" v-for="(i, index) in songInfoList"
        @dblclick="CorePlaySelectSong(i.id)">
        <div class="title">{{ i.name }}</div>
        <div class="function_button">
          <i class="iconfont icon-24gl-playCircle" @click="store.PlaySelectSong(i.id)"></i>
          <i class="iconfont icon-24gl-trash2" @click="store.RemoveSong(i.id)"></i>
        </div>
      </div>
    </div>
  </div>
 */