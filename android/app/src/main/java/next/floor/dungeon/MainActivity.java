package next.floor.dungeon;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

import app.xplatform.capacitor.plugins.AdMob;
import com.getcapacitor.community.audio.NativeAudio;
import gamma.plugins.playgame.PlayGames;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(AdMob.class);
      add(NativeAudio.class);
      add(PlayGames.class);
    }});
  }
}
